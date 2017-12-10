import React from "react";
import Yup from "yup";

import AbstractForm from "../AbstractForm";

const props = {
  icon: "user plus",
  header: "Sign up",
  description:
    "To fully enjoy all of the benefits of Glassfinder, create your free account today!",
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
      validation: Yup.string()
        .min(6, "Password must be at least 6 characters.")
        .max(128, "Password cannot exceed 128 characters.")
        .required("Password is required.")
    },
    {
      name: "passwordAgain",
      type: "password",
      label: "Password, again",
      placeholder: "Enter password again",
      value: "",
      validation: Yup.mixed().test("match", "Passwords must match", function(
        password
      ) {
        return password === this.options.parent.password;
      })
    }
  ],
  onSubmit: values => {
    alert(`Signing up with ${JSON.stringify(values, null, 2)}`);
  }
};

export default function SignupForm() {
  return <AbstractForm {...props} />;
}
