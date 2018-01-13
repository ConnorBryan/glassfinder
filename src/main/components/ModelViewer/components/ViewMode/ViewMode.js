import React from "react";
import PropTypes from "prop-types";
import { Menu, Dropdown, Icon } from "semantic-ui-react";
import styled from "styled-components";

import ExploreMode from "../ExploreMode";

function ViewMode({ mode, switchToTiles, switchToItems, switchToCards }) {
  const Styles = styled.div`
    .header {
      text-transform: uppercase !important;
      letter-spacing: 0.33rem !important;
    }
  `;

  return (
    <Styles>
      <Menu.Menu position="left">
        <Menu.Item icon="options" />
        <Menu.Item header content="Options" />
        <Dropdown item text={`Viewing as ${mode.toLowerCase()}s`}>
          <Dropdown.Menu>
            <Dropdown.Item
              active={mode === ExploreMode.RenderModes.Tile}
              onClick={switchToTiles}
            >
              <Icon name="grid layout" /> Tiles
            </Dropdown.Item>
            <Dropdown.Item
              active={mode === ExploreMode.RenderModes.Item}
              onClick={switchToItems}
            >
              <Icon name="list layout" /> Items
            </Dropdown.Item>
            <Dropdown.Item
              active={mode === ExploreMode.RenderModes.Card}
              onClick={switchToCards}
            >
              <Icon name="block layout" /> Cards
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
  switchToCards: PropTypes.func.isRequired
};

export default ViewMode;
