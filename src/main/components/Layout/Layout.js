import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { Container, Segment } from "semantic-ui-react";
import styled from "styled-components";

import routes, { RecursiveRoutes } from "../../routes";
import Navbar from "../../components/Navbar";

function Layout(props) {
  const Styles = styled.div`
    .segments > .segment:first-of-type {
      padding: 0 !important;
    }
  `;

  return (
    <Styles>
      <Container fluid>
        <Segment basic>
          <Navbar />
        </Segment>
        <BrowserRouter>
          <Switch>
            {routes.map((route, i) => <RecursiveRoutes key={i} {...route} />)}
          </Switch>
        </BrowserRouter>
      </Container>
    </Styles>
  );
}

export default Layout;
