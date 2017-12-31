import React from "react";
import Yup from "yup";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import * as Validators from "../../../../validators";
import AbstractForm from "../../../../components/AbstractForm";
import { attemptSignup } from "../../redux/actions";

const formProps = {
  icon: "user plus",
  header: "Sign up",
  fields: [
    {
      name: "email",
      type: "email",
      label: "Email",
      placeholder: "Enter email",
      value: "",
      validation: Validators.email
    },
    {
      name: "emailAgain",
      type: "email",
      label: "Email, again",
      placeholder: "Enter email again",
      value: "",
      validation: Yup.mixed().test("match", "Emails must match", function(
        email
      ) {
        return email === this.options.parent.email;
      })
    },
    {
      name: "newPassword",
      type: "password",
      label: "Password",
      placeholder: "Enter password",
      value: "",
      validation: Validators.password
    },
    {
      name: "currentPassword",
      type: "password",
      label: "Password, again",
      placeholder: "Enter password again",
      value: "",
      validation: Validators.passwordAgain
    }
  ]
};

function SignupForm(props) {
  const { account, history, attemptSignup } = props;
  const onSubmit = ({ email, newPassword: password }) => {
    attemptSignup(email, password);
    history.push("/");
  };

  return account ? (
    <Redirect to="/my-account" />
  ) : (
    <AbstractForm onSubmit={onSubmit} {...formProps} />
  );
}

export default connect(
  state => ({
    account: state.account
  }),
  dispatch => ({
    attemptSignup: (email, password) => dispatch(attemptSignup(email, password))
  })
)(withRouter(SignupForm));
