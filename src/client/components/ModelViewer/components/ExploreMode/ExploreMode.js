import React, { Component } from "react";
import PropTypes from "prop-types";
import { Container, Segment, Loader, Search } from "semantic-ui-react";
import styled from "styled-components";
import queryString from "query-string";
import { flatten, times, escapeRegExp } from "lodash";

import {
  retrieveFromCache,
  cacheIsExpired,
  updateCache
} from "../../../../../util";
import { fancy } from "../../../../styles/snippets";

import ViewMode from "../ViewMode";
import Pagination from "../Pagination";

const Styles = styled.div`
  margin-bottom: 0 !important;

  .menu {
    margin: 0 !important;
    border-radius: 0 !important;
  }

  .viewport {
    min-height: 55vh !important;
  }

  .fancy {
    .item,
    .ui.menu .ui.dropdown .menu > .item {
      ${fancy};
    }
  }
`;

export default class ExploreMode extends Component {
  static propTypes = {
    plural: PropTypes.string.isRequired, // e.g. { [plural]: [] } e.g. { shops: [] }
    location: PropTypes.shape({
      search: PropTypes.string.isRequired
    }),
    history: PropTypes.object.isRequired,
    exploreService: PropTypes.func.isRequired, // XHR to receive collections of models.
    renderTile: PropTypes.func.isRequired, // renderMode functions.
    renderItem: PropTypes.func.isRequired,
    renderCard: PropTypes.func.isRequired
  };

  static RenderModes = {
    Tile: "Tile",
    Item: "Item",
    Card: "Card"
  };

  constructor(props) {
    super(props);

    this.state = this.getInitialState();
  }

  getInitialState() {
    const {
      uri,
      plural,
      cacheTerm,
      location: { search },
      history
    } = this.props;

    // Adjust initial state based on the URL's query string.
    const { userId, type, page, renderMode } = queryString.parse(search);

    const userIdParam =
      typeof userId === "undefined" || isNaN(+userId) ? null : userId;
    const typeParam = typeof type === "undefined" ? null : type;
    const pageParam = typeof page === "undefined" || isNaN(+page) ? 0 : page;
    const renderModeParam =
      typeof renderMode === "undefined"
        ? ExploreMode.RenderModes.Tile
        : renderMode;
    const userIdInQuery = userIdParam
      ? `userId=${userIdParam}&type=${typeParam}&`
      : "";
    const query = `?${userIdInQuery}page=${pageParam}&renderMode=${renderModeParam}`;

    history.replace(`${uri}${query}`);

    // Attempt to hydrate cached data.
    const userIdAddendum = userId ? `For${userId}` : "";
    this.collectionKey = `${cacheTerm || plural}${userIdAddendum}`;
    this.modelKey = `${cacheTerm || plural}Models${userIdAddendum}`;
    this.perPageKey = `${cacheTerm || plural}PerPage${userIdAddendum}`;
    this.totalPagesKey = `${cacheTerm || plural}TotalPages${userIdAddendum}`;

    const perPage = retrieveFromCache(this.perPageKey) || 6;
    const totalPages = retrieveFromCache(this.totalPagesKey) || 1;
    const cachedCollection = retrieveFromCache(this.collectionKey);
    const cachedModels = retrieveFromCache(this.modelKey);
    const collection = JSON.parse(cachedCollection || "[]");
    const models = JSON.parse(cachedModels || "[]");
    const isCacheExpired = cacheIsExpired();

    return {
      renderMode: renderModeParam,
      userId: isNaN(+userId) ? null : +userId,
      type: typeParam || null,
      page: isNaN(+page) ? 0 : +page,
      collection: isCacheExpired ? [] : collection,
      models: isCacheExpired ? [] : models,
      perPage: isCacheExpired ? 1 : +perPage,
      totalPages: isCacheExpired ? 1 : +totalPages,
      loading: true
    };
  }

  componentDidMount() {
    const { collection, page } = this.state;

    return (collection[page] || []).length > 0
      ? this.setState({ loading: false })
      : this.fetchCollection();
  }

  componentDidUpdate(prevProps) {
    const { location: { search: currentSearch } } = this.props;
    const { location: { search: prevSearch } } = prevProps;

    const currentHasId = currentSearch.includes("userId");
    const previousHasId = prevSearch.includes("userId");

    if (currentHasId !== previousHasId) {
      this.setState(this.getInitialState(), this.fetchCollection);
    }
  }

  /**
   * Alter the URL in the browser to correspond with the state of the viewer.
   * @param {number} page
   * @param {string} renderMode 
   */
  adjustUrl(page, renderMode) {
    const { uri, history } = this.props;
    const {
      userId,
      type,
      page: statePage,
      renderMode: stateRenderMode
    } = this.state;

    const userIdInQuery = userId ? `userId=${userId}&type=${type}` : "";
    const pageParam = page || statePage || 0;
    const renderModeParam =
      renderMode || stateRenderMode || ExploreMode.RenderModes.Tile;

    history.push(
      `${uri}?${userIdInQuery}page=${pageParam}&renderMode=${renderModeParam}`
    );
  }

  /**
   * @overview Render Modes
   * In ExploreMode, basic information is show about a varying number of models.
   * These models can be displayed in different formats that alter the display of the data.
   * In addition to basic information, each model will contain actions that lead to various
   *    other pages, including Detail Mode.
   */

  /**
   * Switch between Tile, Item and Card modes.
   * @param {string} mode
   */
  setRenderMode = mode => {
    this.adjustUrl(null, mode);
    this.setState({ renderMode: mode });
  };

  switchToTiles = () => this.setRenderMode(ExploreMode.RenderModes.Tile);
  switchToItems = () => this.setRenderMode(ExploreMode.RenderModes.Item);
  switchToCards = () => this.setRenderMode(ExploreMode.RenderModes.Card);

  /**
 * @overview Pagination
 * To facilitate browsing, a small portion of the entire collection is displayed at a time.
 * After the initial query, a structure of many empty arrays a single populated array will act as the pages.
 * Loading different pages will trigger XHRs to populate these local arrays.
 * After an established period of time, the local data will be cleansed and new data will arrive.
 */

  /**
  * Alternate between collections of models to display,
  * preferring local data to requested data.
  * @param {number} newPage
  */
  setCurrentPage = newPage => {
    const { totalPages } = this.state;

    // No paginating out of bounds.
    if (newPage < 0 || newPage >= totalPages) {
      return this.setState({ loading: false });
    }

    this.adjustUrl(newPage);
    this.setState({ page: newPage }, this.loadPage);
  };

  goToFirstPage = () => this.setCurrentPage(0);
  goToPreviousPage = () => this.setCurrentPage(this.state.page - 1);
  goToNextPage = () => this.setCurrentPage(this.state.page + 1);
  goToLastPage = () => this.setCurrentPage(this.state.totalPages - 1);

  /**
   * Retrieve models for the active page from the server.
   * Prepare the pagination structure for navigation.
   */
  fetchCollection = () => {
    this.setState({ loading: true }, async () => {
      const { exploreService: fetchCollection, plural } = this.props;
      const { userId, type, collection, page } = this.state;

      const potentialFetchTimeout = setTimeout(() => {
        this.setState({ collection: [[]], models: [], loading: false });
      }, 3000);

      const {
        [plural]: newCollection,
        totalPages,
        perPage
      } = await fetchCollection(page, userId, type);

      clearTimeout(potentialFetchTimeout);

      // Redirect to the first page if invalid page.
      if (newCollection.length === 0) {
        return page !== 0
          ? this.setState({ page: 0 }, () => {
              this.adjustUrl(0);
              this.fetchCollection(0, userId, type);
            })
          : this.setState({ collection: [[]], models: [], loading: false });
      }

      // Paginate the results.
      const pages = [];

      collection.length > 0
        ? // Populate with cache data.
          collection.forEach(page => pages.push(page))
        : // Populate with empty pages.
          times(totalPages, () => pages.push([]));

      // Override the cached current page with the new values.
      pages[page] = newCollection;

      // Update the cache with the fetched collection of models.
      updateCache({
        [this.perPageKey]: perPage,
        [this.totalPagesKey]: totalPages,
        [this.collectionKey]: JSON.stringify(pages),
        [this.modelKey]: JSON.stringify(newCollection)
      });

      this.setState({
        totalPages,
        perPage,
        collection: pages,
        models: newCollection,
        loading: false
      });
    });
  };

  sortCollection = sort => {
    this.setState({ loading: true }, async () => {
      if (!sort) {
        return this.setState({ loading: false });
      }

      const { collection, totalPages, perPage } = this.state;

      const flattened = flatten(collection);
      const pages = [];

      times(totalPages, () => pages.push([]));

      let modelCount = 0;
      let pageCount = 0;

      flattened.forEach(model => {
        const activePage = pages[pageCount];

        activePage.push(model);

        modelCount++;

        if (modelCount >= perPage) {
          modelCount = 0;
          pageCount++;
        }
      });

      this.setState({
        collection: pages,
        loading: false
      });
    });
  };

  /**
   * After setting a new page,
   * display data from a) the cache, or b) the server.
   */
  loadPage = () => {
    this.setState({ loading: true }, async () => {
      const { exploreService: fetchCollection, plural } = this.props;
      const { collection, models, page } = this.state;

      // Don't do anything if the page has already been fetched.
      if (collection[page].length > 0) return this.setState({ loading: false });

      // Grab all of the old pages and replace a single one with the collected page.
      const { [plural]: newCollection } = await fetchCollection(page);
      const newPages = [...collection];
      const newModels = [...models, ...newCollection];

      newPages[page] = newCollection;

      // Update the cache with the updated collection of models.
      updateCache({
        [this.collectionKey]: JSON.stringify(newPages),
        [this.modelKey]: JSON.stringify(newModels)
      });

      this.setState({
        collection: newPages,
        models: newModels,
        loading: false
      });
    });
  };

  /**
   * Choose a way to display model data.
   */
  getRenderFunc = () => {
    const { renderMode } = this.state;
    const { renderTile, renderItem, renderCard } = this.props;

    const renderers = {
      [ExploreMode.RenderModes.Tile]: renderTile,
      [ExploreMode.RenderModes.Item]: renderItem,
      [ExploreMode.RenderModes.Card]: renderCard
    };

    return renderers[renderMode];
  };

  /**
   * Navigate to more details about a model.
   */
  onClick = id => {
    const { uri, history } = this.props;

    return history.push(`${uri}/${id}`);
  };

  render() {
    const { plural, sorts } = this.props;
    const {
      loading,
      renderMode: mode,
      collection,
      models,
      page,
      totalPages,
      perPage
    } = this.state;

    const ConfiguredViewMode = ({ upward }) => (
      <ViewMode
        switchToTiles={this.switchToTiles}
        switchToItems={this.switchToItems}
        switchToCards={this.switchToCards}
        sortCollection={this.sortCollection}
        {...{ mode, upward, sorts }}
        mobile
      />
    );

    const ConfiguredSearch = () => <ModelSearch {...{ models }} />;

    const ConfiguredPagination = () => (
      <Pagination
        goToFirstPage={this.goToFirstPage}
        goToPreviousPage={this.goToPreviousPage}
        goToNextPage={this.goToNextPage}
        goToLastPage={this.goToLastPage}
        {...{ plural, page, totalPages, perPage }}
        mobile
      />
    );

    return (
      <Styles>
        <Container>
          <Segment.Group>
            <section className="fancy">
              <ConfiguredViewMode />
              <ConfiguredSearch />
              <ConfiguredPagination />
            </section>
            <Segment className="viewport">
              {loading ? (
                <Loader active />
              ) : (
                this.getRenderFunc()(collection[page], this.onClick)
              )}
            </Segment>
            <section className="fancy">
              <ConfiguredPagination />
              <ConfiguredViewMode upward />
            </section>
          </Segment.Group>
        </Container>
      </Styles>
    );
  }
}

class ModelSearch extends Component {
  constructor(props) {
    super(props);

    this.state = this.getInitialState();
  }

  getInitialState() {
    const { models } = this.props;

    const results = models ? this.format(models) : [];

    return {
      originalResults: results,
      currentResults: results,
      value: "",
      loading: false
    };
  }

  handleResultsSelect = (e, { result }) =>
    this.setState({ value: result.title });

  handleSearchChange = (e, { value: eventValue }) => {
    this.setState({ loading: true, value: eventValue }, () => {
      const { originalResults, value } = this.state;

      const regexp = new RegExp(escapeRegExp(value), "i");
      const isMatch = result => regexp.test(result.title.toLowerCase());

      this.setState({
        loading: false,
        currentResults: originalResults.filter(isMatch)
      });
    });
  };

  format(models) {
    const termDictionary = {
      name: "title",
      description: "description",
      image: "image",
      price: "price"
    };

    return models.map(model => {
      return Object.keys(model)
        .filter(key => termDictionary[key])
        .reduce((prev, next) => {
          prev[termDictionary[next]] = model[next];

          return prev;
        }, {});
    });
  }

  render() {
    const { currentResults: results, loading, value } = this.state;

    return (
      <Search
        fluid
        noResultsMessage="Couldn't find anything."
        size="large"
        onResultSelect={this.handleResultsSelect}
        onSearchChange={this.handleSearchChange}
        {...{ results, loading, value }}
      />
    );
  }
}
