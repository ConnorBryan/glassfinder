import React from "react";
import { Segment } from "semantic-ui-react";

import Splash from "../Splash";
import FeaturedSet from "../FeaturedSet";

function Home() {
  return (
    <Segment.Group>
      <Segment basic>
        <Splash />
      </Segment>
      <FeaturedSet />
    </Segment.Group>
  );
}

export default Home;
