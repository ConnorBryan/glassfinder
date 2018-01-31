import React from "react";
import { withRouter, Redirect } from "react-router-dom";
import { Container, Segment } from "semantic-ui-react";

import * as config from "../../../../../config";
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

function UpdatePassword({ verbiage, account, history, displayNotification }) {
  if (!account) return <Redirect to="/sign-in" />;

  const onSubmit = async ({ currentPassword, newPassword }) => {
    const wasSuccessful = await API.updatePassword(
      account.id,
      currentPassword,
      newPassword
    );

    if (wasSuccessful) {
      history.push("/my-account");

      return displayNotification(config.UPDATE_PASSWORD_SUCCESS_NOTIFICATION);
    }

    return displayNotification(config.UPDATE_PASSWORD_FAILURE_NOTIFICATION);
  };

  return (
    <Container as={Segment}>
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
