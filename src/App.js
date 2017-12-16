import React, { Component } from "react";
import styled from "styled-components";
import { Container, Segment } from "semantic-ui-react";

import Navigation from "./partials/Navigation";
import Footer from "./partials/Footer";

import Home from "./screens/Home";
import Help from "./screens/Help";

import UpgradeToShop from "./forms/UpgradeToShop";
import ExploreShops from "./screens/ExploreShops";

import UpgradeToBrand from "./forms/UpgradeToBrand";
import ExploreBrands from "./screens/ExploreBrands";

class App extends Component {
  render() {
    return (
      <Container>
          <Segment>
            <Navigation />
          </Segment>
          <Segment as={Mid}>
            <Home />
            <Help />
            <UpgradeToShop />
            <ExploreShops />
            <UpgradeToBrand />
            <ExploreBrands />
          </Segment>
          <Segment>
            <Footer />
          </Segment>
      </Container>
    );
  }
}

export default App;

/* Styling */
const I = "!important";
const Mid = styled.main`min-height: 50vh ${I};`;
