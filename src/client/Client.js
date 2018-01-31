import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";

import * as config from "../config";
import { CacheProvider } from "../util";
import API from "./services";
import AgeGate from "./components/AgeGate";
import Layout from "./components/Layout";

export default class Client extends Component {
  constructor(props) {
    super(props);

    this.state = this.getInitialState();
  }

  getInitialState() {
    const account = CacheProvider.retrieve(config.ACCOUNT_CACHE_KEY);
    const token = CacheProvider.retrieve(config.TOKEN_CACHE_KEY);
    const hasDismissedAgeGate = CacheProvider.retrieve(
      config.AGE_GATE_CACHE_KEY
    );
    const verbiage = CacheProvider.retrieve(config.VERBIAGE_CACHE_KEY);

    // For authentication, both account and token must be present.
    if (!account || !token) {
      CacheProvider.remove(config.ACCOUNT_CACHE_KEY);
      CacheProvider.remove(config.TOKEN_CACHE_KEY);
    }

    return {
      account,
      token,
      hasDismissedAgeGate,
      verbiage,
      mobileNavigationActive: false,
      notification: null
    };
  }

  componentDidMount() {
    this.setVerbiage();
  }

  componentDidCatch(error) {
    CacheProvider.removeAll();

    this.setState(this.getInitialState(), () => {
      this.setVerbiage();
      this.displayNotification(config.CATASTROPHIC_ERROR_NOTIFICATION);
    });
  }

  /**
   * The Verbiage is the collection of words and phrases that make up most of the text on Glassfinder.
   * On a cold load, we grab the text from the database and cache it.
   * On a hot load, we ensure the cached verbiage is in date and then use it.
   */
  setVerbiage = async () => {
    const { verbiage: cachedVerbiage } = this.state;
    const verbiage = cachedVerbiage || (await API.fetchVerbiage());

    if (!cachedVerbiage) {
      CacheProvider.update(
        config.VERBIAGE_CACHE_KEY,
        verbiage,
        config.VERBIAGE_CACHE_EXPIRATION
      );

      this.setState({ verbiage });
    }
  };

  /**
   * When browsing from a mobile device, display a menu listing buttons that route to each page.
   */
  setMobileNavigationActive = mobileNavigationActive =>
    this.setState({ mobileNavigationActive });
  showMobileNavigation = () => this.setMobileNavigationActive(true);
  hideMobileNavigation = () => this.setMobileNavigationActive(false);

  /**
   * Alert new users that the site contains material suitable for adults.
   */
  dismissAgeGate = () => {
    this.setState({ hasDismissedAgeGate: true }, () => {
      CacheProvider.update(
        config.AGE_GATE_CACHE_KEY,
        true,
        config.AGE_GATE_CACHE_EXPIRATION
      );

      this.displayNotification(config.WELCOME_NOTIFICATION);
    });
  };

  /**
   * Notifications appear at the top of the screen and alert the user to some happening.
   */
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

  /**
   * Make changes to the storaged account whenever a form completes.
   */
  updateAccount = (key, value) => {
    this.setState(
      prevState => ({
        account: { ...prevState.account, [key]: value }
      }),
      () => {
        const { account } = this.state;

        CacheProvider.update(
          config.ACCOUNT_CACHE_KEY,
          account,
          config.ACCOUNT_CACHE_EXPIRATION
        );
      }
    );
  };

  updateAccountLink = link => this.updateAccount("link", link);

  signin = async (email, password) => {
    const { token, account, unverified } = await API.signin(email, password);

    if (unverified) {
      this.displayNotification(config.VERIFY_TO_SIGN_IN_NOTIFICATION);

      return false;
    } else if (!token || !account) {
      this.displayNotification(config.BAD_SIGN_IN_NOTIFICATION);

      return false;
    }

    this.setState({ token, account }, () => {
      CacheProvider.update(
        config.ACCOUNT_CACHE_KEY,
        account,
        config.ACCOUNT_CACHE_EXPIRATION
      );
      CacheProvider.update(
        config.TOKEN_CACHE_KEY,
        token,
        config.TOKEN_CACHE_EXPIRATION
      );
    });

    this.displayNotification(config.GOOD_SIGN_IN_NOTIFICATION);

    return true;
  };

  signout = () => {
    this.setState({ token: null, account: null }, () => {
      CacheProvider.remove(config.ACCOUNT_CACHE_KEY);
      CacheProvider.remove(config.TOKEN_CACHE_KEY);
      CacheProvider.remove(config.MY_PIECES_CACHE_KEY);

      this.displayNotification(config.SIGN_OUT_NOTIFICATION);
    });
  };

  signup = async (email, password) => {
    const id = await API.signup(email, password);

    return id || this.displayNotification(config.BAD_SIGN_UP_NOTIFICATION);
  };

  render() {
    const { hasDismissedAgeGate } = this.state;

    return hasDismissedAgeGate ? (
      <BrowserRouter>
        <Layout
          {...this.state}
          displayNotification={this.displayNotification}
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
