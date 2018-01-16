import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Container, Segment, Loader } from "semantic-ui-react";
import styled from "styled-components";
import Aux from "react-aux";

import API from "../../services";
import * as Validators from "../../validators";

function VerificationLoading() {
  return <p>Loading...</p>;
}

function VerificationVerifying() {
  return <p>Verifying...</p>;
}

function VerificationPostSignup() {
  return <p>Post Signup...</p>;
}

function VerificationResend() {
  return <p>Resend...</p>;
}

function VerificationError() {
  return <p>Error...</p>;
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
    const { history } = this.props;
    const { id, verificationCode } = this.state;
    const verified = await API.verify(id, verificationCode);

    if (verified) {
      history.push("/");
    } else {
      this.setState({ mode: Verification.Modes.Error });
    }
  }

  getRenderMode() {
    const { mode } = this.state;

    const renderFuncs = {
      [Verification.Modes.Loading]: () => <VerificationLoading />,
      [Verification.Modes.Verifying]: () => <VerificationVerifying />,
      [Verification.Modes.PostSignup]: () => <VerificationPostSignup />,
      [Verification.Modes.Resend]: () => <VerificationResend />,
      [Verification.Modes.Error]: () => <VerificationError />
    };

    return renderFuncs[mode];
  }

  render() {
    const renderMode = this.getRenderMode();
    return <Container>{renderMode()}</Container>;
  }
}

export default withRouter(Verification);
