import React from "react";

import AdminAPI from "../../../../services";
import ModelCreator from "../../../../components/ModelCreator";
import fields from "../../fields";

export default function CreateUser({ history }) {
  const props = {
    createModel: AdminAPI.createUser,
    redirect: "/users",
    icon: "user",
    title: "Create user",
    description: "Add a user manually."
  };

  return <ModelCreator {...props} {...{ history, fields }} />;
}
