import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Menu, Grid } from "semantic-ui-react";
import styled from "styled-components";

import * as config from "../../../config";
import { centered, fancy } from "../../styles/snippets";
import { blue as palette } from "../../styles/palettes";
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

  .ModelExplorer-detail {
    padding: 0 !important;
    min-width: 30vw !important;
    max-width: 30vw !important;
    min-height: 80vh !important;
    max-height: 80vh !important;
    border: 1px solid white !important;
    border-right: none !important;
    background: ${palette.invertedBackground};
    ${centered};
  }

  .ModelExplorer-row {
    flex-wrap: initial !important;
  }
`;

class ModelExplorer extends Component {
  state = {
    loading: true,
    sort: config.SORT_DATE_ASCENDING,
    models: [],
    currentPage: 0,
    totalPages: 1,
    totalModels: 0,
    perPage: config.MODEL_READ_LIMIT,
    viewingDetail: this.props.location.pathname.split("/").length === 3,
    id: this.props.location.pathname.split("/")[2]
  };

  resource = this.props.resource;
  cacheKey = this.props.cacheKey;
  cacheExpiration = this.props.cacheExpiration;

  componentDidMount() {
    this.setModels();
  }

  setModels = (sort = this.state.sort) => {
    this.setState({ loading: true, sort }, async () => {
      const { fetchModels, fetchDetailModels } = this.props;
      const { currentPage, sort, viewingDetail, id } = this.state;

      const fetch = viewingDetail ? fetchDetailModels : fetchModels;

      const { page: models, totalPages, perPage, totalModels } = await fetch(
        currentPage,
        sort,
        id
      );

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
    const {
      icon,
      title,
      detailTitle,
      renderItems,
      renderDetailItems,
      resource,
      renderDetail
    } = this.props;
    const {
      id,
      loading,
      models,
      currentPage,
      perPage,
      totalPages,
      totalModels,
      viewingDetail
    } = this.state;

    return (
      <Styles>
        <Menu className="ModelExplorer-menu" attached="top" inverted>
          <Menu.Item header {...{ icon, content: title }} />
        </Menu>
        <Grid inverted divided columns={12}>
          <Grid.Row className="ModelExplorer-row">
            {viewingDetail ? (
              <Grid.Column className="ModelExplorer-detail">
                {renderDetail(id)}
              </Grid.Column>
            ) : (
              <ExplorerMap />
            )}
            <Explorer
              {...{
                title: viewingDetail ? detailTitle : title,
                loadFirstPage,
                loadPreviousPage,
                loadNextPage,
                loadLastPage,
                currentPage,
                totalPages: +totalPages <= 0 ? 1 : totalPages,
                renderItems: viewingDetail ? renderDetailItems : renderItems,
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

export default withRouter(ModelExplorer);
