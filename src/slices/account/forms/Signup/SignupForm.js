import React from "react";
import Yup from "yup";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import * as Validators from "../../../../validators";
import AbstractForm from "../../../../abstracts/AbstractForm";

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
      name: "password",
      type: "password",
      label: "Password",
      placeholder: "Enter password",
      value: "",
      validation: Validators.password
    },
    {
      name: "passwordAgain",
      type: "password",
      label: "Password, again",
      placeholder: "Enter password again",
      value: "",
      validation: Validators.passwordAgain
    }
  ],
  onSubmit: values => {
    alert(`Signing up with ${JSON.stringify(values, null, 2)}`);
  }
};

function SignupForm(props) {
  const { account } = props;

  return account ? (
    <Redirect to="/my-account" />
  ) : (
    <AbstractForm {...formProps} />
  );
}

export default connect(state => ({
  account: state.account
}))(SignupForm);
