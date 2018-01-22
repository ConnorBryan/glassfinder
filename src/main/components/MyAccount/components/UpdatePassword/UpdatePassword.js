import React from "react";
import { withRouter, Redirect } from "react-router-dom";
import { Container } from "semantic-ui-react";

import API from "../../../../services";
import * as Validators from "../../../../validators";
import ScreenHeader from "../../../ScreenHeader";
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

function UpdatePassword({ verbiage, account, history }) {
  if (!account) return <Redirect to="/sign-in" />;

  const onSubmit = async ({ currentPassword, newPassword }) => {
    await API.updatePassword(account.id, currentPassword, newPassword);
    history.push("/my-account");
  };

  return (
    <Container>
      <ScreenHeader
        icon="lock"
        title={verbiage.UpdatePassword_title}
        description={verbiage.UpdatePassword_description}
      />
      <AbstractForm onSubmit={onSubmit} fields={FIELDS} />
    </Container>
  );
}

export default withRouter(UpdatePassword);
