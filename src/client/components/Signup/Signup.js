import React from "react";
import Yup from "yup";
import { Container, Segment } from "semantic-ui-react";

import * as Validators from "../../validators";
import FormScreen from "../FormScreen";

const FIELDS = [
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
    validation: Yup.mixed().test("match", "Emails must match", function(email) {
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
];

function Signup({ verbiage, signup, history }) {
  const onSubmit = async ({ email, newPassword }) => {
    const id = await signup(email, newPassword);

    if (id) {
      history.push(`/verification/${id}`);
    }
  };

  const screenHeader = {
    icon: "question circle",
    title: verbiage.Signup_title,
    description: verbiage.Signup_title
  };

  const abstractForm = {
    onSubmit,
    fields: FIELDS
  };

  return <FormScreen {...{ screenHeader, abstractForm }} />;
}

export default Signup;
