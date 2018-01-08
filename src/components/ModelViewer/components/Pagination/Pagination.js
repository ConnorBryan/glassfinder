import React from "react";
import PropTypes from "prop-types";

function Pagination(props) {
  const {
    activePage,
    totalPages,
    goToFirstPage,
    regressPage,
    advancePage,
    goToLastPage,
    modelsPerPage
  } = props;

  return (
    <p>
      <strong>Page: </strong> {activePage + 1} / {totalPages}
      <button onClick={goToFirstPage}>{"<<"}</button>
      <button onClick={regressPage}>{"<"}</button>
      <button onClick={advancePage}>{">"}</button>
      <button onClick={goToLastPage}>{">>"}</button>
      <em>Showing {modelsPerPage} models per page</em>
    </p>
  );
}

Pagination.propTypes = {
  activePage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  goToFirstPage: PropTypes.func.isRequired,
  regressPage: PropTypes.func.isRequired,
  advancePage: PropTypes.func.isRequired,
  goToLastPage: PropTypes.func.isRequired,
  modelsPerPage: PropTypes.number.isRequired
};

export default Pagination;
