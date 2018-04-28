import React, { Component } from "react";
import { Sidebar, Menu } from "semantic-ui-react";
import Aux from "react-aux";

import * as config from "../../../../../config";

class ExplorerOptions extends Component {
  render() {
    const {
      compact,
      toggle,
      visible,
      sort,
      perPage,
      totalModels,
      collectionItemsContainer
    } = this.props;

    const fancyStyle = {
      textTransform: "uppercase",
      letterSpacing: "0.25rem"
    };

    const onClick = compact
      ? (...args) => {
          sort(...args);
          toggle();
        }
      : (...args) => {
          sort(...args);
          collectionItemsContainer && collectionItemsContainer.scrollIntoView();
        };

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
        vertical
        inverted
        {...{ visible }}
      >
        {options}
      </Sidebar>
    ) : (
      <Menu style={{ margin: 0, width: "100vw" }} vertical inverted>
        {options}
      </Menu>
    );
  }
}

export default ExplorerOptions;
