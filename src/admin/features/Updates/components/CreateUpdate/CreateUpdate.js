import React from "react";

import AdminAPI from "../../../../services";
import ModelCreator from "../../../../components/ModelCreator";
import fields from "../../fields";

export default function CreateUpdate({ history }) {
  const props = {
    createModel: AdminAPI.createUpdate,
    redirect: "/updates",
    icon: "newspaper",
    title: "Create update",
    description: "Keep your users in the loop."
  };

  return <ModelCreator {...props} {...{ history, fields }} />;
}
