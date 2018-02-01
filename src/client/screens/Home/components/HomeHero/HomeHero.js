import React from "react";
import { Segment } from "semantic-ui-react";
import styled from "styled-components";

import { fancy } from "../../../../styles/snippets";
import Splash from "../../../../components/Splash";

const Styles = styled.div`
  .HomeHero {
    border: 1px solid white !important;
    padding: 0 !important;
  }

  .header {
    ${fancy};
  }
`;

function HomeHero({ verbiage }) {
  return (
    <Styles>
      <Segment className="HomeHero" inverted>
        <Splash {...{ verbiage }} />
      </Segment>
    </Styles>
  );
}

export default HomeHero;
