import React from "react";
import { connect } from "react-redux";

import * as Validators from "../../../../validators";
import AbstractForm from "../../../../components/AbstractForm";
import { attemptUpdatePassword } from "../../redux/actions";

const formProps = {
  icon: "lock",
  header: "Update password",
  fields: [
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
  ]
};

function UpdatePasswordForm(props) {
  const { attemptUpdatePassword } = props;

  const onSubmit = ({ currentPassword, newPassword }) => {
    attemptUpdatePassword(currentPassword, newPassword);
  };

  return <AbstractForm onSubmit={onSubmit} {...formProps} />;
}

export default connect(null, dispatch => ({
  attemptUpdatePassword: (currentPassword, newPassword) =>
    dispatch(attemptUpdatePassword(currentPassword, newPassword))
}))(UpdatePasswordForm);
