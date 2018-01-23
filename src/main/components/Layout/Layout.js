import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter, Switch, Link } from "react-router-dom";
import {
  Container,
  Button,
  Segment,
  Sidebar,
  List,
  Divider,
  Sticky
} from "semantic-ui-react";
import styled from "styled-components";

import routes, { RecursiveRoutes } from "../../routes";
import Navbar from "../Navbar";
import MobileNavigation from "../MobileNavigation";

const Styles = styled.div`
  .pushable {
    min-height: 80vh !important;
    padding: 4rem 0 4rem 0 !important;
  }
  .main {
    min-height: 100vh !important;
    background: url(/background.jpg) no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  }
  .footer {
    border-top: 1px solid rgb(220, 220, 220);

    .segment {
      min-height: 30vh !important;
      margin: 0 !important;
    }
  }
  .button {
    text-transform: uppercase !important;
    letter-spacing: 0.33rem !important;
  }
  .Navbar-segment {
    z-index: 3 !important;
    margin: 0 !important;
    padding: 0 !important;
  }
`;

class Layout extends Component {
  static propTypes = {
    mobileNavigationActive: PropTypes.bool.isRequired,
    showMobileNavigation: PropTypes.func.isRequired,
    hideMobileNavigation: PropTypes.func.isRequired,
    account: PropTypes.object,
    token: PropTypes.string,
    updateAccount: PropTypes.func.isRequired,
    updateAccountLink: PropTypes.func.isRequired,
    signin: PropTypes.func.isRequired,
    signout: PropTypes.func.isRequired,
    signup: PropTypes.func.isRequired,
    verbiage: PropTypes.object.isRequired
  };

  state = { showNavbarBorder: false };

  componentWillReceiveProps(nextProps) {
    const { location: { pathname: currentPathname } } = this.props;
    const { location: { pathname: nextPathname } } = nextProps;

    if (currentPathname !== nextPathname) {
      window.scrollTo(0, 0);
    }
  }

  handleContext = context => this.setState({ context });

  showNavbarBorder = () => this.setState({ showNavbarBorder: true });
  hideNavbarBorder = () => this.setState({ showNavbarBorder: false });

  render() {
    const {
      mobileNavigationActive,
      showMobileNavigation,
      hideMobileNavigation,
      account,
      token,
      updateAccount,
      updateAccountLink,
      signin,
      signout,
      signup,
      verbiage
    } = this.props;
    const { context, showNavbarBorder } = this.state;

    const navigationProps = {
      mobileNavigationActive,
      showMobileNavigation,
      hideMobileNavigation
    };
    const additionalProps = {
      account,
      context,
      token,
      updateAccount,
      updateAccountLink,
      signin,
      signout,
      signup,
      verbiage
    };
    const closeSidebar = () => mobileNavigationActive && hideMobileNavigation();
    const scrollToTop = () => window.scrollTo(0, 0);

    return (
      <Styles>
        <section ref={this.handleContext}>
          <Container className="main" fluid>
            <Segment className="Navbar-segment" basic>
              <Sticky
                context={context}
                onStick={this.showNavbarBorder}
                onUnstick={this.hideNavbarBorder}
              >
                <Navbar
                  showBorder={showNavbarBorder}
                  {...navigationProps}
                  {...additionalProps}
                />
              </Sticky>
              <MobileNavigation {...navigationProps} {...additionalProps} />
            </Segment>
            <Sidebar.Pushable>
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
        </section>
      </Styles>
    );
  }
}

export default withRouter(Layout);
