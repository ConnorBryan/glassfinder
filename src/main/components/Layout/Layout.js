import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter, Switch, Link } from "react-router-dom";
import {
  Container,
  Button,
  Segment,
  Sidebar,
  List,
  Divider
} from "semantic-ui-react";
import styled from "styled-components";

import routes, { RecursiveRoutes } from "../../routes";
import Navbar from "../Navbar";
import MobileNavigation from "../MobileNavigation";

const Styles = styled.div`
  .pushable {
    min-height: 80vh !important;
  }
  .main {
    min-height: 100vh !important;
  }
  .footer > .segment {
    min-height: 30vh !important;
    margin: 0 !important;
  }
  .button {
    text-transform: uppercase !important;
    letter-spacing: 0.33rem !important;
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
  const scrollToTop = () => window.scrollTo(0, 0);

  return (
    <BrowserRouter>
      <Styles>
        <Container className="main" fluid>
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
        <Container className="footer" fluid>
          <Segment inverted clearing>
            <Container>
              <List size="big" inverted>
                <List.Item
                  as={Link}
                  to="/terms-and-conditions"
                  icon="chevron right"
                  content="Terms and Conditions"
                />
                <List.Item
                  as={Link}
                  to="/privacy-policy"
                  icon="chevron right"
                  content="Privacy Policy"
                />
              </List>
              <Divider inverted />
              <List size="big" inverted>
                <List.Item icon="users" content="Glassfinder" />
                <List.Item icon="marker" content="Dallas, TX" />
                <List.Item
                  icon="mail"
                  content={
                    <a href="mailto:hello@glassfinder.com">
                      hello@glassfinder.com
                    </a>
                  }
                />
                <List.Item
                  icon="linkify"
                  content={
                    <a href="https://glassfinder.com">glassfinder.com</a>
                  }
                />
              </List>
              <Button
                icon="chevron up"
                floated="right"
                content="Back to top"
                onClick={scrollToTop}
                primary
              />
            </Container>
          </Segment>
        </Container>
      </Styles>
    </BrowserRouter>
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
