import React from "react";
import { Sidebar, Segment } from "semantic-ui-react";
import styled from "styled-components";

import ShopMap from "../../../ShopMap";

const Styles = styled.div`
  .ExplorerMap {
    padding: 0 !important;
    border: 1px solid white !important;
    border-left: none !important;
  }
`;

function ExplorerMap({ compact, visible }) {
  const map = (
    <Segment className="ExplorerMap" inverted>
      <ShopMap />
    </Segment>
  );

  const mapStyle = {
    padding: 0,
    border: "1px solid white",
    borderLeft: "none",
    maxHeight: "70vh",
    overflow: "hidden"
  };

  return (
    <Styles {...{ compact }}>
      {compact ? (
        <Sidebar
          as={Segment}
          style={mapStyle}
          inverted
          animation="overlay"
          width="wide"
          {...{ visible }}
        >
          <ShopMap />
        </Sidebar>
      ) : (
        <Segment className="ExplorerMap" inverted>
          <ShopMap />
        </Segment>
      )}
    </Styles>
  );
}

export default ExplorerMap;
