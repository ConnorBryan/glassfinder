import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter, Switch } from "react-router-dom";
import { Container, Segment, Sidebar } from "semantic-ui-react";
import Aux from "react-aux";

import routes, { RecursiveRoutes } from "../../routes";
import Navbar from "../Navbar";
import MobileNavigation from "../MobileNavigation";

function Layout({
  mobileNavigationActive,
  showMobileNavigation,
  hideMobileNavigation
}) {
  const navigationProps = {
    mobileNavigationActive,
    showMobileNavigation,
    hideMobileNavigation
  };

  return (
    <BrowserRouter>
      <Container fluid>
        <Segment basic>
          <Navbar {...navigationProps} />
        </Segment>
        <Sidebar.Pushable>
          <MobileNavigation {...navigationProps} />
          <Sidebar.Pusher as={Switch}>
            {routes.map((route, i) => <RecursiveRoutes key={i} {...route} />)}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Container>
    </BrowserRouter>
  );
}

Layout.propTypes = {
  mobileNavigationActive: PropTypes.bool.isRequired,
  showMobileNavigation: PropTypes.func.isRequired,
  hideMobileNavigation: PropTypes.func.isRequired
};

export default Layout;
