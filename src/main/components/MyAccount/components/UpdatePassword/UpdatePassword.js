import React from "react";
import { withRouter, Redirect } from "react-router-dom";
import { Container } from "semantic-ui-react";
import Yup from "yup";

import API from "../../../../services";
import * as Validators from "../../../../validators";
import AbstractForm from "../../../AbstractForm";

const FIELDS = [
  {
    name: "currentPassword",
    type: "password",
    label: "Current password",
    placeholder: "Enter your current password",
    value: "",
    validation: Validators.password
  },
  {
    name: "newPassword",
    type: "password",
    label: "New password",
    placeholder: "Enter your new password",
    value: "",
    validation: Validators.passwordAgain
  }
];

function UpdatePassword({ account, history }) {
  if (!account) return <Redirect to="/sign-in" />;

  const onSubmit = async ({ currentPassword, newPassword }) => {
    await API.updatePassword(account.id, currentPassword, newPassword);
    history.push("/my-account");
  };

  return (
    <Container>
      <AbstractForm onSubmit={onSubmit} fields={FIELDS} />
    </Container>
  );
}

export default withRouter(UpdatePassword);
