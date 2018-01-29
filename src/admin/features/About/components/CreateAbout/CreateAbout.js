import React from "react";

import AdminAPI from "../../../../services";
import ModelCreator from "../../../../components/ModelCreator";
import fields from "../../fields";

export default function CreateAbout({ history }) {
  const props = {
    createModel: AdminAPI.createAbout,
    redirect: "/about",
    icon: "user",
    title: "Create about",
    description: "Add a team member and show off your growth."
  };

  return <ModelCreator {...props} {...{ history, fields }} />;
}
