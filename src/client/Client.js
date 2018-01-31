import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";

import * as config from "../config";
import API from "./services";
import { updateCache, retrieveFromCache, removeFromCache } from "./util";
import AgeGate from "./components/AgeGate";
import Layout from "./components/Layout";

export default class Client extends Component {
  constructor(props) {
    super(props);

    const account = retrieveFromCache("account");
    const token = retrieveFromCache("token");
    const hasDismissedAgeGate = retrieveFromCache("hasDismissedAgeGate");

    if (!account || !token) removeFromCache("account", "token");

    this.state = {
      verbiage: {},
      mobileNavigationActive: false,
      account: account && token ? JSON.parse(account) : null,
      token: token || null,
      error: null,
      notification: null,
      hasDismissedAgeGate: !!hasDismissedAgeGate
    };
  }

  componentDidMount() {
    this.setVerbiage();
    this.displayNotification("Damn");
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

  // Age Gate
  dismissAgeGate = () => {
    this.setState({ hasDismissedAgeGate: true }, () =>
      updateCache("hasDismissedAgeGate", true)
    );
  };

  // Notifications
  displayNotification = notification => {
    if (this.goingToHideNotification)
      clearTimeout(this.goingToHideNotification);

    this.setState(
      { notification },
      () =>
        (this.goingToHideNotification = setTimeout(
          this.hideNotification,
          config.NOTIFICATION_TIMEOUT
        ))
    );
  };

  hideNotification = () => {
    this.setState({ notification: null });
  };

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
    const { hasDismissedAgeGate, notification } = this.state;

    return hasDismissedAgeGate ? (
      <BrowserRouter>
        <Layout
          {...this.state}
          hideNotification={this.hideNotification}
          showMobileNavigation={this.showMobileNavigation}
          hideMobileNavigation={this.hideMobileNavigation}
          updateAccount={this.updateAccount}
          updateAccountLink={this.updateAccountLink}
          signin={this.signin}
          signout={this.signout}
          signup={this.signup}
        />
      </BrowserRouter>
    ) : (
      <AgeGate dismiss={this.dismissAgeGate} />
    );
  }
}
