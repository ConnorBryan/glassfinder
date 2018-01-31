import React from "react";
import { Segment } from "semantic-ui-react";
import styled from "styled-components";

import Splash from "../Splash";
import FeaturedSet from "../FeaturedSet";

const Styles = styled.div`
  .wrapper {
    padding: 0 !important;
    margin-top: -4.05rem !important;
  }
`;

function Home({ verbiage }) {
  return (
    <Styles>
      <Segment.Group>
        <Segment basic className="wrapper">
          <Splash verbiage={verbiage} />
        </Segment>
        <FeaturedSet verbiage={verbiage} />
      </Segment.Group>
    </Styles>
  );
}

export default Home;
