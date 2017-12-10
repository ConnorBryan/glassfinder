import React from "react";
import Yup from "yup";

import * as Validators from "../../validators";
import AbstractForm from "../AbstractForm";

const props = {
  icon: "sign in",
  header: "Sign in",
  description: "Welcome back.",
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
  ],
  onSubmit: values => {
    alert(`Signing in with ${JSON.stringify(values, null, 2)}`);
  }
};

export default function SigninForm() {
  return <AbstractForm {...props} />;
}
