import React from "react";
import { Segment } from "semantic-ui-react";
import styled from "styled-components";

import Splash from "../Splash";
import FeaturedSet from "../FeaturedSet";

const Styles = styled.div`
  .wrapper {
    padding: 0 !important;
  }
`;

function Home() {
  return (
    <Styles>
      <Segment.Group>
        <Segment basic className="wrapper">
          <Splash />
        </Segment>
        <FeaturedSet />
      </Segment.Group>
    </Styles>
  );
}

export default Home;
