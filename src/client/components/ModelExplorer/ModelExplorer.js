import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Sidebar, Segment, Menu, Container, Icon } from "semantic-ui-react";
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
    border: 1px solid #555 !important;
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

  .map-options-wrapper {
    display: flex;
    align-items: flex-start;
  }

  .explorer-wrapper {
  }
`;

class ModelExplorer extends Component {
  state = this.getInitialState();

  resource = this.props.resource;
  cacheKey = this.props.cacheKey;
  cacheExpiration = this.props.cacheExpiration;

  getInitialState() {
    const {
      location: { pathname }
    } = this.props;

    const isViewMyPieces = pathname.includes("view-my-pieces");
    const splitPath = pathname.split("/");
    const viewingDetail = splitPath.length === (isViewMyPieces ? 4 : 3);
    const id = splitPath[isViewMyPieces ? 3 : 2];

    return {
      loading: true,
      sort: config.SORT_DATE_ASCENDING,
      models: [],
      showingMap: false,
      showingSettings: false,
      currentPage: 0,
      totalPages: 1,
      totalModels: 0,
      perPage: config.MODEL_READ_LIMIT,
      viewingDetail,
      id
    };
  }

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

    const map = viewingDetail ? (
      <Segment inverted>{renderDetail(id)}</Segment>
    ) : (
      <ExplorerMap visible={showingMap} {...{ compact }} />
    );

    const explorer = (
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

    const options = (
      <ExplorerOptions
        {...{ compact, perPage, totalModels }}
        visible={showingSettings}
        sort={this.setModels}
        toggle={this.toggleSettings}
      />
    );

    return (
      <Styles {...{ compact }}>
        <Container
          style={{
            borderLeft: "1px solid #555",
            borderRight: "1px solid #555"
          }}
        >
          <Menu
            className="ModelExplorer-menu"
            attached="top"
            inverted
            widths={1}
          >
            <Menu.Item header>
              <h2>
                <Icon name={icon} /> {title}
              </h2>
            </Menu.Item>
          </Menu>
          {compact && (
            <Menu
              className="ModelExplorer-menu ModelExplorer-menu_bottom"
              inverted
              widths={2}
            >
              {viewingDetail ? (
                <Menu.Item
                  icon="block layout"
                  content={`View all ${resource}`}
                  as={Link}
                  to={`/${resource}`}
                />
              ) : (
                <Menu.Item
                  icon="map"
                  content="Map"
                  active={showingMap}
                  onClick={this.toggleMap}
                />
              )}
              <Menu.Item
                icon="settings"
                content="Settings"
                active={showingSettings}
                onClick={this.toggleSettings}
              />
            </Menu>
          )}
          <Sidebar.Pushable>
            <div
              className="map-options-wrapper"
              style={{ backgroundColor: "#1b1c1d" }}
            >
              {map}
              {options}
            </div>
            <div className="explorer-wrapper">{explorer}</div>
          </Sidebar.Pushable>
        </Container>
      </Styles>
    );
  }
}

export default withRouter(ModelExplorer);
