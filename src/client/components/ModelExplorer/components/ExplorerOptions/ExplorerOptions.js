import React from "react";
import { Sidebar, Menu } from "semantic-ui-react";
import Aux from "react-aux";

import * as config from "../../../../../config";

function ExplorerOptions({
  compact,
  toggle,
  visible,
  sort,
  perPage,
  totalModels
}) {
  const mobileMenuStyle = {
    border: "1px solid white",
    maxHeight: "60vh"
  };

  const desktopMenuStyle = {
    border: "1px solid white",
    minWidth: "15vw",
    maxWidth: "15vw",
    minHeight: "80vh",
    maxHeight: "80vh"
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
      style={mobileMenuStyle}
      vertical
      inverted
      {...{ visible }}
    >
      {options}
    </Sidebar>
  ) : (
    <Menu style={desktopMenuStyle} vertical inverted>
      {options}
    </Menu>
  );
}

export default ExplorerOptions;
