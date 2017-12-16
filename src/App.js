import React, { Component } from "react";
import styled from "styled-components";
import { Container, Segment } from "semantic-ui-react";

import Navigation from "./partials/Navigation";
import Footer from "./partials/Footer";

import Home from "./screens/Home";

class App extends Component {
  render() {
    return (
      <Container>
        <Segment.Group>
          <Segment>
            <Navigation />
          </Segment>
          <Segment as={Mid}>
            <Home />
          </Segment>
          <Footer />
        </Segment.Group>
      </Container>
    );
  }
}

export default App;

/* Styling */
const I = "!important";
const Mid = styled.main`min-height: 50vh ${I};`;
