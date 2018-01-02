import React, { Component } from "react";
import { connect } from "react-redux";
import { Segment, Loader } from "semantic-ui-react";
import styled from "styled-components";
import Aux from "react-aux";

import config from "../../config";
import * as Validators from "../../validators";
import { verifyCode } from "../../redux/actions";
import withPageHeader from "../../components/withPageHeader";
import AbstractForm from "../../components/AbstractForm";

function AbstractVerificationCodeScreen({ info, onSubmit, formProps }) {
  const UL = ({ children }) => <ul>{children}</ul>;

  return (
    <Aux>
      <Segment attached="top" as={UL}>
        {info.map((item, index) => <li key={index}>{item}</li>)}
      </Segment>
      <AbstractForm onSubmit={onSubmit} {...formProps} />
    </Aux>
  );
}

function VerificationCodeEntry(props) {
  const info = [
    "You've completed the sign up process. Please check your email for a verification code link; it should arrive in your inbox shortly.",
    "If your email provider disables links in emails, you may enter it below."
  ];

  const onSubmit = values => console.log(values);

  const formProps = {
    icon: "eye",
    fields: [
      {
        name: "verificationCode",
        type: "text",
        label: "Verification code",
        placeholder: "Enter verification code",
        value: "",
        validation: Validators.email
      }
    ]
  };

  return (
    <AbstractVerificationCodeScreen
      info={info}
      onSubmit={onSubmit}
      formProps={formProps}
    />
  );
}

function ResendVerificationCode(props) {
  const info = [
    "If you have signed up for an account and have not yet verified, please check your email inbox for your verification code.",
    "If you need another code, enter your email and another will be mailed to you."
  ];

  const onSubmit = values => console.log(values);

  const formProps = {
    icon: "eye",
    fields: [
      {
        name: "email",
        type: "email",
        label: "Resend verification code to",
        placeholder: "Enter email",
        value: "",
        validation: Validators.email
      }
    ],
    onSubmit: values => console.info(values)
  };

  return (
    <AbstractVerificationCodeScreen
      info={info}
      onSubmit={onSubmit}
      formProps={formProps}
    />
  );
}

class Verify extends Component {
  constructor(props) {
    super(props);

    const { id, verificationCode } = this.props;

    switch (true) {
      // Case A: Confirm verification code.
      case !!(id && verificationCode):
        this.state = {
          Component: () => <Loader active>Verifying code...</Loader>,
          verifying: true
        };
        break;
      // Case B: Post sign up process.
      case !!id:
        this.state = { Component: VerificationCodeEntry };
        break;
      // Default case: Resend verification code.
      default:
        this.state = { Component: ResendVerificationCode };
    }
  }

  componentDidMount() {
    const { verifying } = this.state;
    const { verify, id, verificationCode } = this.props;

    if (verifying)
      this.setState({ verifying: false }, () => verify(id, verificationCode));
  }

  render() {
    const { Component } = this.state;

    return <Component {...this.props} />;
  }
}

export default connect(
  state => ({
    id: state.router.location.pathname.split("/")[2],
    verificationCode: state.router.location.pathname.split("/")[3]
  }),
  dispatch => ({
    verify: (id, code) => dispatch(verifyCode(id, code))
  })
)(withPageHeader(config.pageHeaders.verify, Verify));

/* Styling */
export const Fancy = styled.div`
  button {
    text-transform: uppercase !important;
    letter-spacing: 0.25rem !important;
  }
`;
