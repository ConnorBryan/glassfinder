import React from "react";

import AdminAPI from "../../../../services";
import ModelEditor from "../../../ModelEditor";
import formFields from "../../fields";

export default function EditHelp({ location, history }) {
  const props = {
    fetchModel: AdminAPI.fetchHelp,
    updateModel: AdminAPI.updateHelp,
    redirect: "/help",
    icon: "question",
    title: "Edit a help topic",
    description: "Make changes to a help topic."
  };

  return <ModelEditor {...props} {...{ history, location, formFields }} />;
}
