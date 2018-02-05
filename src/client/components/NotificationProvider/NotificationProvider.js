import React, { Component } from "react";

import * as config from "../../../config";
import Notification from "../Notification";

export default class NotificationProvider extends Component {
  state = {
    notification: null
  };

  componentDidMount() {
    const { setDisplayNotification, setHideNotification } = this.props;

    setDisplayNotification(this.displayNotification);
    setHideNotification(this.hideNotification);
  }

  /**
   * Notifications appear at the top of the screen and alert the user to some happening.
   */
  clearNotificationTimeout = () =>
    this.goingToHideNotification && clearTimeout(this.goingToHideNotification);

  displayNotification = notification => {
    this.clearNotificationTimeout();

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
    this.clearNotificationTimeout();

    this.setState({ notification: null });
  };

  render() {
    const { notification } = this.state;

    return notification ? (
      <Notification dismiss={this.hideNotification} message={notification} />
    ) : null;
  }
}
