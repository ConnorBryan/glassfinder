import React from "react";

import * as Validators from "../../../../validators";
import AbstractForm from "../../../../forms/AbstractForm";

const props = {
  icon: "lock",
  header: "Update password",
  fields: [
    {
      name: "password",
      type: "password",
      label: "Password",
      placeholder: "Enter password",
      value: "",
      validation: Validators.password
    },
    {
      name: "passwordAgain",
      type: "password",
      label: "Password, again",
      placeholder: "Enter password again",
      value: "",
      validation: Validators.passwordAgain
    }
  ],
  onSubmit: values => {
    alert(`Updating password with ${JSON.stringify(values, null, 2)}`);
  }
};

export default function UpdatePasswordForm() {
  return <AbstractForm {...props} />;
}
