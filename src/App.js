import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import styled from "styled-components";
import { Container, Segment } from "semantic-ui-react";

import config from "./config";
import Navigation from "./partials/Navigation";
import AccountBar from "./partials/AccountBar";
import Footer from "./partials/Footer";

class App extends Component {
  render() {
    const { route } = this.props;

    return (
      <Container>
        <Segment color={config.color}>
          <Navigation />
          <AccountBar />
        </Segment>
        <Segment color={config.color}>{renderRoutes(route.routes)}</Segment>
        <Segment color={config.color}>
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
