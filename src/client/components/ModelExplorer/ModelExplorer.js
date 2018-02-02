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
  state = {
    loading: true,
    sort: config.SORT_DATE_ASCENDING,
    models: [],
    currentPage: 0,
    totalPages: 1,
    totalModels: 0,
    perPage: config.MODEL_READ_LIMIT
  };

  fetchModels = this.props.fetchModels;
  resource = this.props.resource;
  cacheKey = this.props.cacheKey;
  cacheExpiration = this.props.cacheExpiration;

  componentDidMount() {
    this.setModels();
  }

  setModels = (sort = this.state.sort) => {
    this.setState({ loading: true, sort }, async () => {
      const { currentPage, sort } = this.state;

      const {
        page: models,
        totalPages,
        perPage,
        totalModels
      } = await this.fetchModels(currentPage, sort);

      this.setState({
        models,
        totalPages,
        perPage,
        totalModels,
        loading: false
      });
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
    const { icon, title: content, renderItems, resource } = this.props;
    const {
      loading,
      models,
      currentPage,
      perPage,
      totalPages,
      totalModels
    } = this.state;

    return (
      <Styles>
        <Menu className="ModelExplorer-menu" attached="top" inverted>
          <Menu.Item header {...{ icon, content }} />
        </Menu>
        <Grid inverted divided columns={12}>
          <Grid.Row className="ModelExplorer-row">
            <ExplorerMap />
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
                loading,
                models
              }}
            />
            <ExplorerOptions
              {...{ perPage, totalModels }}
              sort={this.setModels}
            />
          </Grid.Row>
        </Grid>
      </Styles>
    );
  }
}
