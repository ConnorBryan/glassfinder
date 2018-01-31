import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";

import API from "./services";
import { updateCache, retrieveFromCache, removeFromCache } from "./util";
import Layout from "./components/Layout";

export default class Client extends Component {
  constructor(props) {
    super(props);

    const account = retrieveFromCache("account");
    const token = retrieveFromCache("token");

    if (!account || !token) removeFromCache("account", "token");

    this.state = {
      verbiage: {},
      mobileNavigationActive: false,
      account: account && token ? JSON.parse(account) : null,
      token: token || null,
      error: null
    };
  }

  componentDidMount() {
    this.setVerbiage();
  }

  // Text content
  setVerbiage = async () => {
    let verbiage;

    const cachedVerbiage = JSON.parse(retrieveFromCache("verbiage") || "{}");

    verbiage =
      Object.keys(cachedVerbiage).length > 0
        ? cachedVerbiage
        : await API.fetchVerbiage();

    updateCache("verbiage", JSON.stringify(verbiage));

    this.setState({ verbiage });
  };

  // Mobile responsiveness
  setMobileNavigationActive = mobileNavigationActive =>
    this.setState({ mobileNavigationActive });
  showMobileNavigation = () => this.setMobileNavigationActive(true);
  hideMobileNavigation = () => this.setMobileNavigationActive(false);

  // Authentication
  updateAccount = (key, value) => {
    this.setState(prevState => ({
      account: { ...prevState.account, [key]: value }
    }));
  };

  updateAccountLink = link => this.updateAccount("link", link);

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
      removeFromCache(
        "account",
        "token",
        "myPieces",
        "myPiecesById",
        "myPiecesPerPage",
        "myPiecesTotalPages"
      );
    });
  };

  signup = async (email, password) => {
    const id = await API.signup(email, password);

    if (!id) {
      alert("Bad sign up.");
      return;
    }

    return id;
  };

  render() {
    return (
      <BrowserRouter>
        <Layout
          {...this.state}
          showMobileNavigation={this.showMobileNavigation}
          hideMobileNavigation={this.hideMobileNavigation}
          updateAccount={this.updateAccount}
          updateAccountLink={this.updateAccountLink}
          signin={this.signin}
          signout={this.signout}
          signup={this.signup}
        />
      </BrowserRouter>
    );
  }
}
