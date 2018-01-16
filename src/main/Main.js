import React, { Component } from "react";

import API from "./services";
import { updateCache, retrieveFromCache, removeFromCache } from "./util";
import Layout from "./components/Layout";

export default class Main extends Component {
  state = {
    mobileNavigationActive: false,
    account: null,
    token: null,
    error: null
  };

  componentDidMount() {
    const account = retrieveFromCache("account");
    const token = retrieveFromCache("token");

    if (account && token) {
      this.setState({ account: JSON.parse(account), token });
    } else {
      removeFromCache("account", "token");
    }
  }

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

    this.setState({ token, account }, () => {
      updateCache({
        account: JSON.stringify(account),
        token
      });
    });
  };
  signout = () => {
    this.setState({ token: null, account: null }, () => {
      removeFromCache("account", "token");
    });
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
        signout={this.signout}
        signup={this.signup}
      />
    );
  }
}
