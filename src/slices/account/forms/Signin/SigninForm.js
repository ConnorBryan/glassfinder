import React from "react";
import { connect } from "react-redux";

import * as Validators from "../../../../validators";
import AbstractForm from "../../../../abstracts/AbstractForm";
import { attemptSignin } from "../../../../slices/account/redux/actions";

const formProps = {
  icon: "sign in",
  header: "Sign in",
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
      name: "password",
      type: "password",
      label: "Password",
      placeholder: "Enter password",
      value: "",
      validation: Validators.password
    }
  ]
};

function SigninForm(props) {
  const { attemptSignin } = props;
  const onSubmit = ({ email, password }) => attemptSignin(email, password);

  return <AbstractForm onSubmit={onSubmit} {...formProps} />;
}

export default connect(null, dispatch => ({
  attemptSignin: (email, password) => dispatch(attemptSignin(email, password))
}))(SigninForm);
