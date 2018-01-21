import React from "react";
import PropTypes from "prop-types";
import { Menu, Dropdown, Icon } from "semantic-ui-react";
import styled from "styled-components";

import ExploreMode from "../ExploreMode";

const Styles = styled.div`
  .header {
    text-transform: uppercase !important;
    letter-spacing: 0.33rem !important;
  }
`;

function ViewMode({
  mode,
  upward,
  switchToTiles,
  switchToItems,
  switchToCards
}) {
  const iconMap = {
    [ExploreMode.RenderModes.Tile]: <Icon name="grid layout" />,
    [ExploreMode.RenderModes.Item]: <Icon name="list layout" />,
    [ExploreMode.RenderModes.Card]: <Icon name="block layout" />
  };
  const viewingAs = mode.toLowerCase();

  return (
    <Styles>
      <Menu.Menu position="left">
        <Dropdown item text={`Viewing as ${viewingAs}s`} upward={upward}>
          <Dropdown.Menu>
            <Dropdown.Item
              active={mode === ExploreMode.RenderModes.Tile}
              onClick={switchToTiles}
            >
              {iconMap[ExploreMode.RenderModes.Tile]} Tiles
            </Dropdown.Item>
            <Dropdown.Item
              active={mode === ExploreMode.RenderModes.Item}
              onClick={switchToItems}
            >
              {iconMap[ExploreMode.RenderModes.Item]} Items
            </Dropdown.Item>
            <Dropdown.Item
              active={mode === ExploreMode.RenderModes.Card}
              onClick={switchToCards}
            >
              {iconMap[ExploreMode.RenderModes.Card]} Cards
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown item text="Sort by" />
      </Menu.Menu>
    </Styles>
  );
}

ViewMode.propTypes = {
  mode: PropTypes.string.isRequired,
  switchToTiles: PropTypes.func.isRequired,
  switchToItems: PropTypes.func.isRequired,
  switchToCards: PropTypes.func.isRequired,
  upward: PropTypes.bool
};

export default ViewMode;
