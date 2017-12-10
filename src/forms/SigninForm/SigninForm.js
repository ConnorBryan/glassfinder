import React from "react";
import Yup from "yup";

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
      validation: Yup.string()
        .email("Invalid email address")
        .required("Email is required.")
    },
    {
      name: "password",
      type: "password",
      label: "Password",
      placeholder: "Enter password",
      value: "",
      validation: Yup.string()
        .min(6, "Password must be at least 6 characters.")
        .max(128, "Password cannot exceed 128 characters.")
        .required("Password is required.")
    }
  ],
  onSubmit: values => {
    alert(`Signing in with ${JSON.stringify(values, null, 2)}`);
  }
};

export default function SigninForm() {
  return <AbstractForm {...props} />;
}
