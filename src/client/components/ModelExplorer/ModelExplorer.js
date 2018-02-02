import React, { Component } from "react";
import { Container, Menu, Grid } from "semantic-ui-react";
import styled from "styled-components";

import * as config from "../../../config";
import { CacheProvider } from "../../../util";
import { fancy } from "../../styles/snippets";
import API from "../../services";
import Thing from "../../components/Thing";
import ExplorerOptions from "./components/ExplorerOptions";
import Explorer from "./components/Explorer";
import ExplorerMap from "./components/ExplorerMap";

const Styles = styled.div`
  .ModelExplorer-menu {
    padding: 0 !important;
    border: 1px solid white !important;
    border-bottom: none !important;

    .header {
      ${fancy};
    }
  }

  .ModelExplorer-row {
    flex-wrap: initial !important;
  }
`;

export default class ModelExplorer extends Component {
  static defaultProps = {
    resource: config.LINK_TYPES_TO_RESOURCES[config.LINK_TYPES.SHOP],
    fetchModels: API.fetchShops,
    cacheKey: config.SHOPS_CACHE_KEY,
    cacheExpiration: config.SHOPS_CACHE_EXPIRATION,
    renderItems: (models = []) =>
      models.map(
        (
          {
            image,
            name: title,
            email: top,
            description: content,
            street,
            city,
            state,
            zip
          },
          index
        ) => {
          const bottom = `${street}, ${city}, ${state} ${zip}`;

          return (
            <Thing key={index} {...{ image, title, top, content, bottom }} />
          );
        }
      )
  };

  state = {
    sort: config.SORT_DATE_ASCENDING,
    models: [],
    currentPage: 0,
    totalPages: 0,
    perPage: config.MODEL_READ_LIMIT
  };

  fetchModels = this.props.fetchModels;
  resource = this.props.resource;
  cacheKey = this.props.cacheKey;
  cacheExpiration = this.props.cacheExpiration;

  componentDidMount() {
    this.setModels();
  }

  setModels = async () => {
    const { currentPage, sort } = this.state;
    // const cachedModels = CacheProvider.retrieve(this.cacheKey);

    // if (cachedModels && !CacheProvider.hasExpired(cachedModels)) {
    //   return this.setState({
    //     models: cachedModels[this.resource],
    //     totalPages: cachedModels.totalPages,
    //     perPage: cachedModels.perPage
    //   });
    // }

    const { page: models, totalPages, perPage } = await this.fetchModels(
      currentPage,
      sort
    );

    // CacheProvider.update(this.cacheKey, models, this.cacheExpiration);

    this.setState({ models, totalPages, perPage });
  };

  sortModels = async sort => {
    const { currentPage } = this.state;

    const { page: models, totalPages, perPage } = await this.fetchModels(
      currentPage,
      sort
    );

    this.setState({
      sort,
      models,
      totalPages,
      perPage
    });
  };

  loadPage = currentPage => this.setState({ currentPage }, this.setModels);

  loadFirstPage = () => this.loadPage(0);
  loadPreviousPage = () => {
    const { currentPage } = this.state;
    const nextPage = currentPage - 1;

    if (nextPage > -1) {
      this.loadPage(nextPage);
    }
  };
  loadNextPage = () => {
    const { currentPage, totalPages } = this.state;
    const nextPage = currentPage + 1;

    if (nextPage < totalPages) {
      this.loadPage(nextPage);
    }
  };
  loadLastPage = () => this.loadPage(this.state.totalPages - 1);

  render() {
    const {
      loadFirstPage,
      loadPreviousPage,
      loadNextPage,
      loadLastPage
    } = this;
    const { renderItems, resource } = this.props;
    const { models, currentPage, totalPages } = this.state;

    return (
      <Styles>
        <Menu className="ModelExplorer-menu" attached="top" inverted>
          <Menu.Item header icon="shopping cart" content="Explore Shops" />
        </Menu>
        <Grid inverted divided columns={12}>
          <Grid.Row className="ModelExplorer-row">
            <ExplorerOptions sort={this.sortModels} />
            <Explorer
              {...{
                loadFirstPage,
                loadPreviousPage,
                loadNextPage,
                loadLastPage,
                currentPage,
                totalPages,
                renderItems,
                resource,
                models
              }}
            />
            <ExplorerMap />
          </Grid.Row>
        </Grid>
      </Styles>
    );
  }
}
