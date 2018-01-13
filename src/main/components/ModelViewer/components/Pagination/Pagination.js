import React from "react";
import PropTypes from "prop-types";
import { Responsive, Menu } from "semantic-ui-react";
import Aux from "react-aux";

function Pagination({
  goToFirstPage,
  goToPreviousPage,
  goToNextPage,
  goToLastPage,
  plural,
  page,
  perPage,
  totalPages
}) {
  return (
    <Aux>
      <Menu.Menu className="ui" position="right">
        <Menu.Item
          icon="fast backward"
          disabled={page === 0}
          onClick={goToFirstPage}
        />
        <Menu.Item
          icon="backward"
          disabled={page === 0}
          onClick={goToPreviousPage}
        />
        <Menu.Item header>
          <em>
            Viewing page {page + 1} of {totalPages}
          </em>
        </Menu.Item>
        <Menu.Item
          icon="forward"
          disabled={page + 1 >= totalPages}
          onClick={goToNextPage}
        />
        <Menu.Item
          icon="fast forward"
          disabled={page + 1 >= totalPages}
          onClick={goToLastPage}
        />
      </Menu.Menu>
      <Responsive as={Menu.Item} {...Responsive.onlyComputer} header>
        Showing {`${perPage} ${plural}`} per page.
      </Responsive>
    </Aux>
  );
}

Pagination.propTypes = {
  goToFirstPage: PropTypes.func.isRequired,
  goToPreviousPage: PropTypes.func.isRequired,
  goToNextPage: PropTypes.func.isRequired,
  goToLastPage: PropTypes.func.isRequired,
  plural: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired
};

export default Pagination;
