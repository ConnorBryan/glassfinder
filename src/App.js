import React, { Component } from "react";
import styled from "styled-components";
import { Container, Segment } from "semantic-ui-react";

import Navigation from './partials/Navigation';
import Footer from './partials/Footer';

import Home from "./screens/Home";

class App extends Component {
  render() {
    return (
      <Container>
        <Segment.Group>
          <Segment attached="top">
            <Navigation />
          </Segment>
          <Segment as={Mid} attached="bottom">
            <Home />
          </Segment>
          <Segment attached="bottom">
            <Footer />
          </Segment>
        </Segment.Group>
      </Container>
    );
  }
}

export default App;

/* Styling */

const Mid = styled.main`min-height: 50vh;`;
