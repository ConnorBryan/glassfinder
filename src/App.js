import React, { Component } from "react";
import styled from "styled-components";
import { Container, Segment } from "semantic-ui-react";

import Home from './screens/Home';

const Mid = styled.div`min-height: 50vh;`;

class App extends Component {
  render() {
    return (
      <Container>
        <Segment.Group>
          <Segment attached="top">1</Segment>
          <Segment as={Mid} attached="bottom">
            <Home />
          </Segment>
          <Segment attached="bottom">
          </Segment>
        </Segment.Group>
      </Container>
    );
  }
}

export default App;
