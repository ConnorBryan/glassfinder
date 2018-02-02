import React from "react";
import { Menu } from "semantic-ui-react";
import styled from "styled-components";

const Styles = styled.div`
  .ExplorerOptions {
    min-width: 30vw !important;
    max-width: 30vw !important;
    min-height: 80vh !important;
    max-height: 80vh !important;
    border: 1px solid white !important;
    border-right: none !important;
  }
`;

function ExplorerOptions() {
  return (
    <Styles>
      <Menu className="ExplorerOptions" vertical inverted>
        <Menu.Item header content="Sort by" />
        <Menu.Item content="Date" onClick={() => {}} />
      </Menu>
    </Styles>
  );
}

export default ExplorerOptions;
