import React, { Component } from "react";
import styled from "styled-components";
import { Container, Segment } from "semantic-ui-react";

import Navigation from "./partials/Navigation";
import Footer from "./partials/Footer";

import Home from "./screens/Home";
import ExploreShops from "./screens/ExploreShops";

class App extends Component {
  render() {
    return (
      <Container>
          <Segment>
            <Navigation />
          </Segment>
          <Segment as={Mid}>
            {/*<Home />*/}
            <ExploreShops />
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
