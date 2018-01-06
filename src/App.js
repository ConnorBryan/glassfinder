import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import {
  Container,
  Message,
  Segment,
  Loader,
  Sidebar
} from "semantic-ui-react";
import styled from "styled-components";

import config from "./config";
import { hideWarning, checkForUserData } from "./redux/actions";
import Navigation from "./partials/Navigation";
import AccountBar from "./partials/AccountBar";
import Slider from "./partials/Slider";
import Footer from "./partials/Footer";

import Layout from "./partials/Layout";

class App extends Component {
  componentDidMount() {
    const { checkForUserData, checkedForUserData } = this.props;

    if (!checkedForUserData) checkForUserData();
  }

  render() {
    const { route, warning, loading, hideWarning } = this.props;

    return <Layout />;
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
    loading: state.loading,
    checkedForUserData: state.checkedForUserData
  }),
  dispatch => ({
    checkForUserData: () => dispatch(checkForUserData()),
    hideWarning: () => dispatch(hideWarning())
  })
)(withRouter(App));

// Styling
const Derp = styled(Segment)`min-height: 80vh !important;`;

const Redlined = styled.div`
  border: 1px solid red !important;
  box-shadow: none !important;
`;

const TextCenter = styled.div`text-align: center;`;
