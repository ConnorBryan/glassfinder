import React, { Component } from "react";

import API from "./services";
import { updateCache, retrieveFromCache, removeFromCache } from "./util";
import Layout from "./components/Layout";

export default class Main extends Component {
  constructor(props) {
    super(props);

    const account = retrieveFromCache("account");
    const token = retrieveFromCache("token");

    if (!account || !token) removeFromCache("account", "token");

    this.state = {
      mobileNavigationActive: false,
      account: account && token ? JSON.parse(account) : null,
      token: token || null,
      error: null
    };
  }

  // Mobile responsiveness
  setMobileNavigationActive = mobileNavigationActive =>
    this.setState({ mobileNavigationActive });
  showMobileNavigation = () => this.setMobileNavigationActive(true);
  hideMobileNavigation = () => this.setMobileNavigationActive(false);

  // Authentication
  updateAccountLink = link =>
    this.setState(prevState => ({ account: { ...prevState.account, link } }));

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
        updateAccountLink={this.updateAccountLink}
        signin={this.signin}
        signout={this.signout}
        signup={this.signup}
      />
    );
  }
}
