import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Sidebar, Menu, Grid } from "semantic-ui-react";
import styled from "styled-components";
import Aux from "react-aux";

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
    margin: 0 !important;

    .header,
    .item {
      ${fancy};
    }
  }

  .ModelExplorer-detail {
    padding: 0 !important;
    border: 1px solid white !important;
    border-right: none !important;
    background: ${palette.invertedBackground};
    ${centered};
  }

  .ModelExplorer-row {
    flex-wrap: initial !important;
  }

  .column {
    padding: 0 !important;
  }
`;

class ModelExplorer extends Component {
  state = {
    loading: true,
    sort: config.SORT_DATE_ASCENDING,
    models: [],
    showingMap: false,
    showingSettings: false,
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

  toggleMap = () =>
    this.setState(prevState => ({
      showingMap: !prevState.showingMap,
      showingSettings: false
    }));
  toggleSettings = () =>
    this.setState(prevState => ({
      showingSettings: !prevState.showingSettings,
      showingMap: false
    }));

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
      compact,
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
      showingMap,
      showingSettings,
      currentPage,
      perPage,
      totalPages,
      totalModels,
      viewingDetail
    } = this.state;

    const left = viewingDetail ? (
      renderDetail(id)
    ) : (
      <ExplorerMap visible={showingMap} {...{ compact }} />
    );

    const center = (
      <Explorer
        {...{
          compact,
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
    );

    const right = (
      <ExplorerOptions
        {...{ compact, perPage, totalModels }}
        visible={showingSettings}
        sort={this.setModels}
        toggle={this.toggleSettings}
      />
    );

    return (
      <Styles {...{ compact }}>
        <Menu
          className="ModelExplorer-menu"
          attached="top"
          inverted
          widths={compact ? 1 : 2}
        >
          <Menu.Item header {...{ icon, content: title }} />
        </Menu>
        {compact && (
          <Menu
            className="ModelExplorer-menu ModelExplorer-menu_bottom"
            inverted
            widths={2}
          >
            <Menu.Item
              icon="map"
              content="Map"
              active={showingMap}
              onClick={this.toggleMap}
            />
            <Menu.Item
              icon="settings"
              content="Settings"
              active={showingSettings}
              onClick={this.toggleSettings}
            />
          </Menu>
        )}
        <Sidebar.Pushable>
          {compact ? (
            <Aux>
              {left}
              {center}
              {right}
            </Aux>
          ) : (
            <Grid>
              <Grid.Row>
                <Grid.Column style={{ minWidth: "30vw", maxWidth: "30vw" }}>
                  {left}
                </Grid.Column>
                <Grid.Column style={{ minWidth: "40vw", maxWidth: "40vw" }}>
                  {center}
                </Grid.Column>
                <Grid.Column style={{ minWidth: "30vw", maxWidth: "30vw" }}>
                  {right}
                </Grid.Column>
              </Grid.Row>
            </Grid>
          )}
        </Sidebar.Pushable>
      </Styles>
    );
  }
}

export default withRouter(ModelExplorer);
