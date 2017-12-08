import React, { Component } from "react";
import SignUpForm from "./screens/forms/SignUp/SignUp";
import {
  Container
} from 'semantic-ui-react';

const user = {
  email: "",
  emailAgain: "",
  password: "",
  passwordAgain: ""
};

class App extends Component {
  render() {
    return (
      <Container text>
        <SignUpForm user={user} />
      </Container>
    );
  }
}

export default App;
