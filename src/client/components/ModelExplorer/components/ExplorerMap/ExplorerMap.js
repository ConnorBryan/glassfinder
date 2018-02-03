import React from "react";
import { Sidebar, Segment } from "semantic-ui-react";

import ShopMap from "../../../ShopMap";

function ExplorerMap({ compact, visible }) {
  const mobileMapStyle = {
    padding: 0,
    border: "1px solid white",
    borderLeft: "none",
    minWidth: "90vw",
    maxWidth: "90vw",
    maxHeight: "70vh",
    overflow: "hidden"
  };

  const desktopMapStyle = {
    padding: 0,
    border: "1px solid white",
    borderLeft: "none",
    minWidth: "30vw",
    maxWidth: "30vw",
    minHeight: "80vh",
    maxHeight: "80vh"
  };

  return compact ? (
    <Sidebar
      as={Segment}
      style={mobileMapStyle}
      inverted
      animation="overlay"
      width="wide"
      {...{ visible }}
    >
      <ShopMap />
    </Sidebar>
  ) : (
    <Segment style={desktopMapStyle} className="ExplorerMap" inverted>
      <ShopMap />
    </Segment>
  );
}

export default ExplorerMap;
