import React from "react";

import AdminAPI from "../../../../services";
import ModelEditor from "../../../../components/ModelEditor";
import formFields from "../../fields";

export default function EditUpdate({ location, history }) {
  const props = {
    fetchModel: AdminAPI.fetchUpdate,
    updateModel: AdminAPI.updateUpdate,
    redirect: "/updates",
    icon: "newspaper",
    title: "Edit an update",
    description: "Make changes to a previous news post."
  };

  return <ModelEditor {...props} {...{ history, location, formFields }} />;
}
