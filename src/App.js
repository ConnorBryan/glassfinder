import React, { Component } from "react";
import styled from "styled-components";
import { Container, Segment } from "semantic-ui-react";

import SignupForm from './forms/SignupForm';

const Mid = styled.div`min-height: 50vh;`;

class App extends Component {
  render() {
    return (
      <Container>
        <Segment.Group>
          <Segment attached="top">1</Segment>
          <Segment as={Mid} attached="bottom">
            <SignupForm />
          </Segment>
          <Segment attached="bottom">
          </Segment>
        </Segment.Group>
      </Container>
    );
  }
}

export default App;
