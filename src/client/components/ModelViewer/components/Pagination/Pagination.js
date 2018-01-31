import React from "react";
import PropTypes from "prop-types";
import { Menu } from "semantic-ui-react";

function Pagination({
  mobile,
  goToFirstPage,
  goToPreviousPage,
  goToNextPage,
  goToLastPage,
  plural,
  page,
  totalPages
}) {
  const MenuComponent = mobile ? Menu : Menu.Menu;
  const widths = mobile ? 5 : undefined;
  const viewingPageText = mobile
    ? `${page + 1} / ${totalPages}`
    : `Viewing page ${page + 1} of ${totalPages}`;

  return (
    <MenuComponent widths={widths} position="right" inverted>
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
        <em>{viewingPageText}</em>
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
    </MenuComponent>
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
