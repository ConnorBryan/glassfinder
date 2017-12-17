import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import styled from "styled-components";
import { Container, Segment } from "semantic-ui-react";

import Navigation from "./partials/Navigation";
import AccountBar from "./partials/AccountBar";
import Footer from "./partials/Footer";

class App extends Component {
  render() {
    const { route } = this.props;

    return (
      <Container>
        <Segment color="blue">
          <Navigation />
          <AccountBar />
        </Segment>
        <Segment color="blue">{renderRoutes(route.routes)}</Segment>
        <Segment color="blue">
          <Footer />
        </Segment>
      </Container>
    );
  }
}

export default withRouter(App);

/* Styling */
const I = "!important";
const Mid = styled.main`min-height: 50vh ${I};`;
