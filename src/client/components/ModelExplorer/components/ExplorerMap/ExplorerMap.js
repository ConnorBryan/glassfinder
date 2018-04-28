import React from "react";
import { Sidebar, Segment } from "semantic-ui-react";

import ShopMap from "../../../ShopMap";

function ExplorerMap({ compact, visible }) {
  return compact ? (
    <Sidebar
      as={Segment}
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
  );
}

export default ExplorerMap;
