import React, { Component } from "react";
import PropTypes from "prop-types";
import { Menu, Segment, Loader } from "semantic-ui-react";
import styled from "styled-components";
import queryString from "query-string";
import { times } from "lodash";

import {
  retrieveFromCache,
  cacheIsExpired,
  updateCache,
  updateCacheExpiration
} from "../common";

import ViewMode from "../ViewMode";
import Pagination from "../Pagination";

export default class ExploreMode extends Component {
  static propTypes = {
    plural: PropTypes.string.isRequired,
    location: PropTypes.shape({
      search: PropTypes.string.isRequired
    }),
    history: PropTypes.object.isRequired,
    exploreService: PropTypes.func.isRequired,
    renderTile: PropTypes.func.isRequired,
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

  /* Render Modes */
  setRenderMode = mode => {
    const { plural, history } = this.props;
    const { page } = this.state;

    history.push(`/${plural}?page=${page}&renderMode=${mode}`);

    this.setState({ renderMode: mode });
  };

  switchToTiles = () => this.setRenderMode(ExploreMode.RenderModes.Tile);
  switchToItems = () => this.setRenderMode(ExploreMode.RenderModes.Item);
  switchToCards = () => this.setRenderMode(ExploreMode.RenderModes.Card);
  /* Render Modes */

  /* Pagination */
  setCurrentPage = newPage => {
    const { history, plural } = this.props;
    const { totalPages, renderMode } = this.state;

    // No paginating out of bounds.
    if (newPage < 0 || newPage >= totalPages) {
      return this.setState({ loading: false });
    }

    history.push(`/${plural}?page=${newPage}&renderMode=${renderMode}`);

    this.setState({ page: newPage }, this.loadPage);
  };

  goToFirstPage = () => this.setCurrentPage(0);
  goToPreviousPage = () => this.setCurrentPage(this.state.page - 1);
  goToNextPage = () => this.setCurrentPage(this.state.page + 1);
  goToLastPage = () => this.setCurrentPage(this.state.totalPages - 1);
  /* Pagination */

  fetchCollection = () => {
    this.setState({ loading: true }, async () => {
      const { exploreService: fetchCollection, plural, history } = this.props;
      const { collection, page } = this.state;

      const {
        [plural]: newCollection,
        totalPages,
        perPage
      } = await fetchCollection(page);

      // Redirect to the first page if invalid page.
      if (!newCollection.length > 0) {
        return this.setState({ page: 0 }, () => {
          history.push(`/${plural}`);
          this.fetchCollection();
        });
      }

      // Paginate the results.
      const pages = [];

      // Add other possibly cached pages prior to recaching.
      collection.length > 0
        ? collection.forEach(page => pages.push(page))
        : times(totalPages, () => pages.push([]));

      // Override the cached current page with the new values.
      pages[page] = newCollection;

      // Update the cache with the fetched collection of models.
      updateCache(this.perPageKey, perPage);
      updateCache(this.totalPagesKey, totalPages);
      updateCache(this.collectionKey, JSON.stringify(pages));
      updateCacheExpiration();

      this.setState({
        totalPages,
        perPage,
        collection: pages,
        loading: false
      });
    });
  };

  loadPage = () => {
    this.setState({ loading: true }, async () => {
      const { exploreService: fetchCollection, plural } = this.props;
      const { collection, page } = this.state;

      // Don't do anything if the page has already been fetched.
      if (collection[page].length > 0) return this.setState({ loading: false });

      const { [plural]: newCollection } = await fetchCollection(page);
      const newPages = [...collection];

      newPages[page] = newCollection;

      // Update the cache with the updated collection of models.
      updateCache(this.collectionKey, JSON.stringify(newPages));
      updateCacheExpiration();

      this.setState({ collection: newPages, loading: false });
    });
  };

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

    const Styles = styled.div`
      margin-bottom: 0 !important;
      min-height: 70vh !important;
    `;

    const OptionsMenu = ({ attached = "" }) => (
      <Menu>
        <ViewMode
          mode={renderMode}
          switchToTiles={this.switchToTiles}
          switchToItems={this.switchToItems}
          switchToCards={this.switchToCards}
        />
        <Pagination
          goToFirstPage={this.goToFirstPage}
          goToPreviousPage={this.goToPreviousPage}
          goToNextPage={this.goToNextPage}
          goToLastPage={this.goToLastPage}
          {...{ plural, page, totalPages, perPage }}
        />
      </Menu>
    );

    const renderFunc = this.getRenderFunc();

    return (
      <Styles>
        <Segment.Group>
          <OptionsMenu attached="top" />
          <Segment>
            {loading ? (
              <Loader active />
            ) : (
              renderFunc(collection[page], this.onClick)
            )}
          </Segment>
          <OptionsMenu />
        </Segment.Group>
      </Styles>
    );
  }
}
