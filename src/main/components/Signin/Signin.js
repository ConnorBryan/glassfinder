import React from "react";
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
    name: "password",
    type: "password",
    label: "Password",
    placeholder: "Enter password",
    value: "",
    validation: Validators.password
  }
];

function Signin({ signin }) {
  const onSubmit = ({ email, password }) => signin(email, password);

  return (
    <Container>
      <AbstractForm onSubmit={onSubmit} fields={FIELDS} />
    </Container>
  );
}

export default Signin;
