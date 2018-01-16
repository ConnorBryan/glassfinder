import React from "react";
import Yup from "yup";
import { Container } from "semantic-ui-react";

import * as Validators from "../../validators";
import AbstractForm from "../AbstractForm";

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

function Signup({ signup }) {
  const onSubmit = ({ email, newPassword }) => signup(email, newPassword);

  return (
    <Container>
      <AbstractForm onSubmit={onSubmit} fields={FIELDS} />
    </Container>
  );
}

export default Signup;
