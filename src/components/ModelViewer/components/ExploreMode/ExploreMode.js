import React from "react";
import PropTypes from "prop-types";
import { Segment, Loader, Sidebar } from "semantic-ui-react";
import styled from "styled-components";
import Aux from "react-aux";

import ModelViewer from "../../ModelViewer";
import Pagination from "../Pagination";

function ExploreMode(props) {
  const {
    children,
    plural,
    renderTile,
    renderItem,
    renderCard,
    models,
    activePage,
    totalPages,
    modelsPerPage,
    exploreMode,
    initiallyFetchedModels,
    renderExploreMode,
    activeModels,
    switchToExploreTileMode,
    switchToExploreItemMode,
    switchToExploreCardMode,
    goToFirstPage,
    regressPage,
    advancePage,
    goToLastPage,
    loadDetailsModeFromExploreMode
  } = props;

  const ModelPagination = ({ attached }) => (
    <Pagination
      {...{
        plural,
        activePage,
        totalPages,
        modelsPerPage,
        goToFirstPage,
        regressPage,
        advancePage,
        goToLastPage,
        loadDetailsModeFromExploreMode,
        attached
      }}
    />
  );

  return initiallyFetchedModels ? (
    <Segment.Group as={ModelView}>
      <ModelPagination attached="top" />
      <Segment attached="bottom">
        {activeModels &&
          renderExploreMode(activeModels, loadDetailsModeFromExploreMode)}
      </Segment>
      <ModelPagination attached="bottom" />
    </Segment.Group>
  ) : (
    <p>Loading...</p>
  );
}

ExploreMode.propTypes = {
  renderTile: PropTypes.func.isRequired,
  renderItem: PropTypes.func.isRequired,
  renderCard: PropTypes.func.isRequired,
  models: PropTypes.array.isRequired,
  activePage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  modelsPerPage: PropTypes.number.isRequired,
  exploreMode: PropTypes.string.isRequired,
  initiallyFetchedModels: PropTypes.bool.isRequired,
  renderExploreMode: PropTypes.func.isRequired,
  activeModels: PropTypes.array.isRequired,
  goToFirstPage: PropTypes.func.isRequired,
  regressPage: PropTypes.func.isRequired,
  advancePage: PropTypes.func.isRequired,
  goToLastPage: PropTypes.func.isRequired,
  loadDetailsModeFromExploreMode: PropTypes.func.isRequired
};

export default ExploreMode;

/* Styling */
const ModelView = styled.main`
  margin-bottom: 0 !important;
  min-height: 70vh;
`;
