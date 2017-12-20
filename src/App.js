import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import { Container, Message, Segment, Loader } from "semantic-ui-react";
import styled from "styled-components";

import config from "./config";
import { hideWarning } from "./redux/actions";
import Navigation from "./partials/Navigation";
import AccountBar from "./partials/AccountBar";
import Footer from "./partials/Footer";

class App extends Component {
  render() {
    const { route, warning, loading, hideWarning } = this.props;

    return (
      <Container>
        <Segment color={config.color}>
          <Navigation />
          <AccountBar />
        </Segment>
        {warning && (
          <Message
            as={Redlined}
            attached="top"
            onDismiss={hideWarning}
            negative
            icon="warning sign"
            header={warning.header}
            content={warning.content}
          />
        )}
        <Segment
          as={warning ? Redlined : Segment}
          attached="bottom"
          color={config.color}
        >
          {loading ? (
            <TextCenter>
              <Loader active inline size="large">
                Loading...
              </Loader>
            </TextCenter>
          ) : (
            renderRoutes(route.routes)
          )}
        </Segment>
        <Segment color={config.color}>
          <Footer />
        </Segment>
      </Container>
    );
  }
}

App.propTypes = {
  route: PropTypes.object.isRequired,
  warning: PropTypes.object,
  hideWarning: PropTypes.func.isRequired
};

export default connect(
  state => ({
    warning: state.warning,
    loading: state.loading
  }),
  dispatch => ({
    hideWarning: () => dispatch(hideWarning())
  })
)(withRouter(App));

// Styling

const Redlined = styled.div`
  border: 1px solid red !important;
  box-shadow: none !important;
`;

const TextCenter = styled.div`text-align: center;`;
