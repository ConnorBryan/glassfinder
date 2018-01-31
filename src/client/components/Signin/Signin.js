import React from "react";
import { Redirect } from "react-router-dom";
import { Container, Segment } from "semantic-ui-react";

import * as Validators from "../../validators";
import ScreenHeader from "../ScreenHeader";
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

function Signin({ verbiage, account, history, signin }) {
  if (account) return <Redirect to="/my-account" />;

  const onSubmit = async ({ email, password }) => {
    const wasSuccessful = await signin(email, password);

    wasSuccessful && history.push("/my-account");
  };

  return (
    <Container as={Segment}>
      <ScreenHeader
        icon="sign in"
        title={verbiage.Signin_title}
        description={verbiage.Signin_description}
      />
      <AbstractForm onSubmit={onSubmit} fields={FIELDS} />
    </Container>
  );
}

export default Signin;
