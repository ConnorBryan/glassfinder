import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter, Switch } from "react-router-dom";
import { Container, Segment, Sidebar } from "semantic-ui-react";
import styled from "styled-components";

import routes, { RecursiveRoutes } from "../../routes";
import Navbar from "../Navbar";
import MobileNavigation from "../MobileNavigation";

const Styles = styled.div`
  .pushable {
    min-height: 80vh !important;
  }
`;

function Layout({
  mobileNavigationActive,
  showMobileNavigation,
  hideMobileNavigation,
  account,
  token,
  updateAccount,
  updateAccountLink,
  signin,
  signout,
  signup
}) {
  const navigationProps = {
    mobileNavigationActive,
    showMobileNavigation,
    hideMobileNavigation
  };
  const additionalProps = {
    account,
    token,
    updateAccount,
    updateAccountLink,
    signin,
    signout,
    signup
  };
  const closeSidebar = () => mobileNavigationActive && hideMobileNavigation();

  return (
    <Styles>
      <BrowserRouter>
        <Container fluid>
          <Segment basic>
            <Navbar {...navigationProps} {...additionalProps} />
          </Segment>
          <Sidebar.Pushable>
            <MobileNavigation {...navigationProps} {...additionalProps} />
            <div onClick={closeSidebar}>
              <Sidebar.Pusher as={Switch}>
                {routes.map((route, i) => (
                  <RecursiveRoutes
                    key={i}
                    additionalProps={additionalProps}
                    {...route}
                  />
                ))}
              </Sidebar.Pusher>
            </div>
          </Sidebar.Pushable>
        </Container>
      </BrowserRouter>
    </Styles>
  );
}

Layout.propTypes = {
  mobileNavigationActive: PropTypes.bool.isRequired,
  showMobileNavigation: PropTypes.func.isRequired,
  hideMobileNavigation: PropTypes.func.isRequired,
  account: PropTypes.object,
  token: PropTypes.string,
  updateAccount: PropTypes.func.isRequired,
  updateAccountLink: PropTypes.func.isRequired,
  signin: PropTypes.func.isRequired,
  signout: PropTypes.func.isRequired,
  signup: PropTypes.func.isRequired
};

export default Layout;
