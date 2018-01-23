import React from "react";
import PropTypes from "prop-types";
import { Menu, Dropdown, Icon } from "semantic-ui-react";
import styled from "styled-components";

import { fancy } from "../../../../styles/snippets";
import ExploreMode from "../ExploreMode";

const Styles = styled.div`
  .header {
    ${fancy};
  }
`;

function ViewMode({
  mobile,
  mode,
  upward,
  sorts,
  sortCollection,
  switchToTiles,
  switchToItems,
  switchToCards
}) {
  const iconMap = {
    [ExploreMode.RenderModes.Tile]: <Icon name="grid layout" />,
    [ExploreMode.RenderModes.Item]: <Icon name="list layout" />,
    [ExploreMode.RenderModes.Card]: <Icon name="block layout" />
  };
  const MenuComponent = mobile ? Menu : Menu.Menu;
  const widths = mobile ? 2 : undefined;

  return (
    <Styles>
      <MenuComponent widths={widths} position="left" inverted>
        <Dropdown item text="Viewing as" {...{ upward }}>
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
        <Dropdown item text="Sort by" {...{ upward }}>
          <Dropdown.Menu>
            {sorts.map(({ icon, name, func }) => (
              <Dropdown.Item onClick={() => sortCollection(func)}>
                <Icon name={icon} /> {name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </MenuComponent>
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
