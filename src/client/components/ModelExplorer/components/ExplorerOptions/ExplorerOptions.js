import React from "react";
import { Sidebar, Menu } from "semantic-ui-react";
import styled from "styled-components";
import Aux from "react-aux";

import * as config from "../../../../../config";
import { fancy } from "../../../../styles/snippets";

const Styles = styled.div`
  .ExplorerOptions {
    border: 1px solid white !important;
    border-right: none !important;
    margin-top: 1.5rem !important;
    min-width: 100vw !important;
  }
`;

function ExplorerOptions({
  compact,
  toggle,
  visible,
  sort,
  perPage,
  totalModels
}) {
  const menuStyle = {
    border: "1px solid white",
    maxHeight: "60vh"
  };

  const fancyStyle = {
    textTransform: "uppercase",
    letterSpacing: "0.25rem"
  };

  const onClick = compact
    ? (...args) => {
        sort(...args);
        toggle();
      }
    : sort;

  const options = (
    <Aux>
      <Menu.Item
        header
        style={fancyStyle}
        icon="cubes"
        content={`Total: ${totalModels}`}
      />
      <Menu.Item
        header
        style={fancyStyle}
        icon="eye"
        content={`Viewing ${perPage} per page`}
      />
      <Menu.Item
        header
        style={fancyStyle}
        icon="chevron down"
        content="Sort by"
      />
      <Menu.Item
        icon="sort ascending"
        content="Oldest"
        onClick={() => onClick(config.SORT_DATE_ASCENDING)}
      />
      <Menu.Item
        icon="sort descending"
        content="Newest"
        onClick={() => onClick(config.SORT_DATE_DESCENDING)}
      />
      <Menu.Item
        icon="sort alphabet ascending"
        content="Name (A-Z)"
        onClick={() => onClick(config.SORT_NAME_ASCENDING)}
      />
      <Menu.Item
        icon="sort alphabet descending"
        content="Name (Z-A)"
        onClick={() => onClick(config.SORT_NAME_DESCENDING)}
      />
    </Aux>
  );

  return compact ? (
    <Sidebar
      as={Menu}
      animation="overlay"
      width="wide"
      style={menuStyle}
      vertical
      inverted
      {...{ visible }}
    >
      {options}
    </Sidebar>
  ) : (
    <Styles>
      <Menu className="ExplorerOptions" vertical inverted>
        {options}
      </Menu>
    </Styles>
  );
}

export default ExplorerOptions;
