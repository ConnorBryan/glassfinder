import React, { Component } from "react";

import Layout from "./components/Layout";

export default class Main extends Component {
  state = {
    mobileNavigationActive: false
  };

  setMobileNavigationActive = mobileNavigationActive =>
    this.setState({ mobileNavigationActive });
  showMobileNavigation = () => this.setMobileNavigationActive(true);
  hideMobileNavigation = () => this.setMobileNavigationActive(false);

  render() {
    const { mobileNavigationActive } = this.state;

    return (
      <Layout
        mobileNavigationActive={mobileNavigationActive}
        showMobileNavigation={this.showMobileNavigation}
        hideMobileNavigation={this.hideMobileNavigation}
      />
    );
  }
}
