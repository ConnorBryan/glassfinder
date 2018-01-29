import React from "react";

import AdminAPI from "../../../../services";
import ModelCreator from "../../../ModelCreator";
import fields from "../../fields";

export default function CreateHelp({ history }) {
  const props = {
    createModel: AdminAPI.createHelp,
    redirect: "/help",
    icon: "question",
    title: "Create help topic",
    description: "Clarify how to use the application."
  };

  return <ModelCreator {...props} {...{ history, fields }} />;
}
