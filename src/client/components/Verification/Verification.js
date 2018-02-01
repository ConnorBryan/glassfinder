import React, { Component } from "react";
import { Redirect, withRouter } from "react-router-dom";
import { Segment, Loader } from "semantic-ui-react";

import * as config from "../../../config";
import * as Validators from "../../validators";
import API from "../../services";
import FormScreen from "../FormScreen";

const FIELDS = [
  {
    name: "email",
    type: "email",
    label: "Email",
    placeholder: "Enter email",
    value: "",
    validation: Validators.email
  }
];

function VerificationLoading() {
  return (
    <Segment style={{ minHeight: "70vh", fontSize: "1.2rem" }}>
      <Loader active content="Loading..." />
    </Segment>
  );
}

function VerificationVerifying() {
  return (
    <Segment style={{ minHeight: "70vh", fontSize: "1.2rem" }}>
      <Loader active content="Verifying..." />
    </Segment>
  );
}

function VerificationPostSignup({ displayNotification }) {
  displayNotification(config.SIGN_UP_SUCCESS_NOTIFICATION);

  return <Redirect to="/sign-in" />;
}

function VerificationResend({ history, displayNotification }) {
  const onSubmit = async ({ email }) => {
    const wasSuccessful = await API.resendVerification(email);

    if (wasSuccessful) {
      history.push("/sign-in");

      return displayNotification(
        config.RESEND_VERIFICATION_SUCCESS_NOTIFICATION
      );
    }

    return displayNotification(config.RESEND_VERIFICATION_ERROR_NOTIFICATION);
  };

  const screenHeader = {
    icon: "eye",
    title: "Resend verification",
    description:
      "Sometimes things get lost in the shuffle. We can send out another email to get you verified and ready to go."
  };

  const abstractForm = {
    onSubmit,
    fields: FIELDS
  };

  return <FormScreen {...{ screenHeader, abstractForm }} />;
}

function VerificationError({ displayNotification }) {
  displayNotification(config.USER_VERIFICATION_ERROR_NOTIFICATION);

  return <Redirect to="/sign-in" />;
}

class Verification extends Component {
  static Modes = {
    Loading: "Loading",
    Verifying: "Verifying",
    PostSignup: "PostSignup",
    Resend: "Resend",
    Error: "Error"
  };

  constructor(props) {
    super(props);

    const [, , id, verificationCode] = props.location.pathname.split("/");

    this.state = {
      id,
      verificationCode,
      mode: Verification.Modes.Loading
    };
  }

  componentDidMount() {
    const { id, verificationCode } = this.state;

    if (id && verificationCode) {
      this.setState({ mode: Verification.Modes.Verifying }, this.verify);
    } else if (id) {
      this.setState({ mode: Verification.Modes.PostSignup });
    } else {
      this.setState({ mode: Verification.Modes.Resend });
    }
  }

  async verify() {
    const { history, displayNotification } = this.props;
    const { id, verificationCode } = this.state;
    const verified = await API.verify(id, verificationCode);

    if (verified) {
      history.push("/");

      return displayNotification(config.USER_VERIFICATION_SUCCESS_NOTIFICATION);
    }

    return this.setState({ mode: Verification.Modes.Error });
  }

  getRenderMode() {
    const { mode } = this.state;

    const renderFuncs = {
      [Verification.Modes.Loading]: () => (
        <VerificationLoading {...this.props} />
      ),
      [Verification.Modes.Verifying]: () => (
        <VerificationVerifying {...this.props} />
      ),
      [Verification.Modes.PostSignup]: () => (
        <VerificationPostSignup {...this.props} />
      ),
      [Verification.Modes.Resend]: () => <VerificationResend {...this.props} />,
      [Verification.Modes.Error]: () => <VerificationError {...this.props} />
    };

    return renderFuncs[mode];
  }

  render() {
    const renderMode = this.getRenderMode();

    return renderMode();
  }
}

export default withRouter(Verification);
