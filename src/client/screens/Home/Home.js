import React from "react";
import { Grid } from "semantic-ui-react";
import styled from "styled-components";

import * as config from "../../../config";
import HomeHero from "./components/HomeHero";
import HomeTile from "./components/HomeTile";

const Styles = styled.div`
  .Home-header,
  .Home-row {
    padding: 0 !important;
  }
`;

function Home({ verbiage }) {
  return (
    <Styles>
      <Grid divided>
        <Grid.Row className="Home-row">
          <Grid.Column className="Home-header" width={16}>
            <HomeHero {...{ verbiage }} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row className="Home-row" columns={2} stretched>
          <HomeTile {...config.HOME_TILES[0]} />
          <HomeTile {...config.HOME_TILES[1]} />
        </Grid.Row>
        <Grid.Row className="Home-row" columns={2} stretched>
          <HomeTile {...config.HOME_TILES[2]} />
          <HomeTile {...config.HOME_TILES[3]} />
        </Grid.Row>
      </Grid>
    </Styles>
  );
}

export default Home;
