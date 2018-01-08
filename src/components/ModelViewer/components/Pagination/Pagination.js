import React from "react";
import PropTypes from "prop-types";
import { Menu } from "semantic-ui-react";

function Pagination(props) {
  const {
    attached,
    plural,
    activePage,
    totalPages,
    goToFirstPage,
    regressPage,
    advancePage,
    goToLastPage,
    modelsPerPage
  } = props;

  return (
    <Menu attached={attached}>
      <Menu.Menu position="left">
        <Menu.Item icon="eye" />
        <Menu.Item header>
          Showing {`${modelsPerPage} ${plural}`} per page.
        </Menu.Item>
      </Menu.Menu>
      <Menu.Menu position="right">
        <Menu.Item icon="fast backward" onClick={goToFirstPage} />
        <Menu.Item icon="backward" onClick={regressPage} />
        <Menu.Item header>
          <em>
            Viewing page {activePage + 1} of {totalPages}
          </em>
        </Menu.Item>
        <Menu.Item icon="forward" onClick={advancePage} />
        <Menu.Item icon="fast forward" onClick={goToLastPage} />
      </Menu.Menu>
    </Menu>
  );
}

Pagination.propTypes = {
  attached: PropTypes.string.isRequired,
  plural: PropTypes.string.isRequired,
  activePage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  goToFirstPage: PropTypes.func.isRequired,
  regressPage: PropTypes.func.isRequired,
  advancePage: PropTypes.func.isRequired,
  goToLastPage: PropTypes.func.isRequired,
  modelsPerPage: PropTypes.number.isRequired
};

export default Pagination;
