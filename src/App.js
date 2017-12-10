import React, { Component } from "react";
import SignUpForm from "./screens/forms/SignUp/SignUp";
import styled from 'styled-components';
import {
  Container,
  Segment,
} from 'semantic-ui-react';

import AbstractForm from './forms/AbstractForm';

const Mid = styled.div`
  min-height: 50vh;
`;

class App extends Component {
  render() {
    return (
      <Container>
        <Segment.Group>
          <Segment attached='top'>
            1
          </Segment>
          <Segment as={Mid} attached='bottom'>
            <AbstractForm test='test' />
          </Segment>
          <Segment attached='bottom'>
            3
          </Segment>
        </Segment.Group>
      </Container>
    );
  }
}

export default App;
