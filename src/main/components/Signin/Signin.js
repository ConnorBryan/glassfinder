import React from "react";
import { Redirect } from "react-router-dom";
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

function Signin({ account, history, signin }) {
  if (account) return <Redirect to="/my-account" />;

  const onSubmit = async ({ email, password }) => {
    await signin(email, password);
    history.push("/my-account");
  };

  return (
    <Container>
      <AbstractForm onSubmit={onSubmit} fields={FIELDS} />
    </Container>
  );
}

export default Signin;
