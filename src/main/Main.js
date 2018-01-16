import React, { Component } from "react";

import API from "./services";
import Layout from "./components/Layout";

export default class Main extends Component {
  state = {
    mobileNavigationActive: false,
    account: null,
    token: null,
    error: null
  };

  // Mobile responsiveness
  setMobileNavigationActive = mobileNavigationActive =>
    this.setState({ mobileNavigationActive });
  showMobileNavigation = () => this.setMobileNavigationActive(true);
  hideMobileNavigation = () => this.setMobileNavigationActive(false);

  // Authentication
  signin = async (email, password) => {
    const { token, account } = await API.signin(email, password);

    if (!token || !account) {
      alert("Bad sign in.");
      return;
    }

    this.setState({ token, account });
  };

  signup = async (email, password) => {
    const id = await API.signup(email, password);

    if (!id) {
      alert("Bad sign up.");
      return;
    }

    console.log(id);
  };

  render() {
    return (
      <Layout
        {...this.state}
        showMobileNavigation={this.showMobileNavigation}
        hideMobileNavigation={this.hideMobileNavigation}
        signin={this.signin}
        signup={this.signup}
      />
    );
  }
}
