import React from "react";
import { Segment } from "semantic-ui-react";
import styled from "styled-components";

import ShopMap from "../../../ShopMap";

const Styles = styled.div`
  .ExplorerMap {
    padding: 0 !important;
    min-width: 30vw !important;
    max-width: 30vw !important;
    min-height: 80vh !important;
    max-height: 80vh !important;
    border: 1px solid white !important;
    border-left: none !important;
  }
`;

function ExplorerMap() {
  return (
    <Styles>
      <Segment className="ExplorerMap" inverted>
        <ShopMap />
      </Segment>
    </Styles>
  );
}

export default ExplorerMap;
