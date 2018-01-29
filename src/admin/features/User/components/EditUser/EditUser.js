import React from "react";

import AdminAPI from "../../../../services";
import ModelEditor from "../../../../components/ModelEditor";
import formFields from "../../fields";

export default function EditUser({ location, history }) {
  const props = {
    fetchModel: AdminAPI.fetchUser,
    updateModel: AdminAPI.updateUser,
    redirect: "/users",
    icon: "users",
    title: "Edit a user",
    description: "Make changes to a user. BE VERY CAREFUL!"
  };

  return <ModelEditor {...props} {...{ history, location, formFields }} />;
}
