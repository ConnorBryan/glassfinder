import React from "react";
import PropTypes from "prop-types";
import { Segment, Loader } from "semantic-ui-react";

import ModelViewer from "../../ModelViewer";
import Pagination from "../Pagination";

function ExploreMode(props) {
  const {
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

  const pagination = (
    <Pagination
      {...{
        activePage,
        totalPages,
        modelsPerPage,
        goToFirstPage,
        regressPage,
        advancePage,
        goToLastPage,
        loadDetailsModeFromExploreMode
      }}
    />
  );

  return initiallyFetchedModels ? (
    <section>
      {pagination}
      <div>
        {activeModels &&
          renderExploreMode(activeModels, loadDetailsModeFromExploreMode)}
      </div>
      {pagination}
    </section>
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
