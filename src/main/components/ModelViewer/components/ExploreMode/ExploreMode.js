import React, { Component } from "react";
import PropTypes from "prop-types";
import { Menu, Segment, Loader, Responsive } from "semantic-ui-react";
import styled from "styled-components";
import queryString from "query-string";
import { times } from "lodash";

import {
  retrieveFromCache,
  cacheIsExpired,
  updateCache
} from "../../../../util";

import ViewMode from "../ViewMode";
import Pagination from "../Pagination";

const Styles = styled.div`
  margin-bottom: 0 !important;
  min-height: 70vh !important;

  .menu {
    margin: 0 !important;
  }
`;

export default class ExploreMode extends Component {
  static propTypes = {
    plural: PropTypes.string.isRequired, // e.g. { [plural]: [] } e.g. { shops: [] }
    location: PropTypes.shape({
      // via Router.
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

    const { plural, location: { search }, history } = props;

    this.collectionKey = plural;
    this.perPageKey = `${plural}PerPage`;
    this.totalPagesKey = `${plural}TotalPages`;

    // Attempt to hydrate cached data.
    const perPage = retrieveFromCache(this.perPageKey) || 6;
    const totalPages = retrieveFromCache(this.totalPagesKey) || 1;
    const cachedCollection = retrieveFromCache(this.collectionKey);
    const collection = JSON.parse(cachedCollection || "[]");
    const isCacheExpired = cacheIsExpired();

    // Adjust initial state based on the URL's query string.
    const { page, renderMode } = queryString.parse(search);
    const pageParam = typeof page === "undefined" || isNaN(+page) ? 0 : page;
    const renderModeParam =
      typeof renderMode === "undefined"
        ? ExploreMode.RenderModes.Tile
        : renderMode;
    const query = `?page=${pageParam}&renderMode=${renderModeParam}`;

    history.push(`/${plural}${query}`);

    this.state = {
      renderMode: renderModeParam,
      page: isNaN(+page) ? 0 : +page,
      collection: isCacheExpired ? [] : collection,
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

  /**
   * Alter the URL in the browser to correspond with the state of the viewer.
   * @param {number} page
   * @param {string} renderMode 
   */
  adjustUrl(page, renderMode) {
    const { plural, history } = this.props;
    const { page: statePage, renderMode: stateRenderMode } = this.state;

    const pageParam = page || statePage || 0;
    const renderModeParam =
      renderMode || stateRenderMode || ExploreMode.RenderModes.Tile;

    history.push(`/${plural}?page=${pageParam}&renderMode=${renderModeParam}`);
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
      const { collection, page } = this.state;

      const {
        [plural]: newCollection,
        totalPages,
        perPage
      } = await fetchCollection(page);

      // Redirect to the first page if invalid page.
      if (newCollection.length === 0) {
        return this.setState({ page: 0 }, () => {
          this.adjustUrl(0);
          this.fetchCollection();
        });
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
        [this.collectionKey]: JSON.stringify(pages)
      });

      this.setState({
        totalPages,
        perPage,
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
      const { collection, page } = this.state;

      // Don't do anything if the page has already been fetched.
      if (collection[page].length > 0) return this.setState({ loading: false });

      // Grab all of the old pages and replace a single one with the collected page.
      const { [plural]: newCollection } = await fetchCollection(page);
      const newPages = [...collection];

      newPages[page] = newCollection;

      // Update the cache with the updated collection of models.
      updateCache(this.collectionKey, JSON.stringify(newPages));

      this.setState({ collection: newPages, loading: false });
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
    const { history, plural } = this.props;

    return history.push(`/${plural}/${id}`);
  };

  render() {
    const { plural } = this.props;
    const {
      loading,
      renderMode,
      collection,
      page,
      totalPages,
      perPage
    } = this.state;

    const ResponsivePagination = ({ responsiveness }) => (
      <Responsive
        as={Pagination}
        {...responsiveness}
        goToFirstPage={this.goToFirstPage}
        goToPreviousPage={this.goToPreviousPage}
        goToNextPage={this.goToNextPage}
        goToLastPage={this.goToLastPage}
        {...{ plural, page, totalPages, perPage }}
      />
    );

    const OptionsMenu = ({ upward = false }) => (
      <Menu>
        <ViewMode
          mode={renderMode}
          switchToTiles={this.switchToTiles}
          switchToItems={this.switchToItems}
          switchToCards={this.switchToCards}
          upward={upward}
        />
        <ResponsivePagination responsiveness={Responsive.onlyComputer} />
      </Menu>
    );

    return (
      <Styles>
        <Segment.Group>
          <OptionsMenu />
          <ResponsivePagination responsiveness={Responsive.onlyMobile} />
          <Segment>
            {loading ? (
              <Loader active />
            ) : (
              this.getRenderFunc()(collection[page], this.onClick)
            )}
          </Segment>
          <ResponsivePagination responsiveness={Responsive.onlyMobile} />
          <OptionsMenu upward />
        </Segment.Group>
      </Styles>
    );
  }
}
