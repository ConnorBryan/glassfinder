import React from "react";

import AdminAPI from "../../../../services";
import ModelEditor from "../../../ModelEditor";
import formFields from "../../fields";

export default function EditAbout({ location, history }) {
  const props = {
    fetchModel: AdminAPI.fetchAbout,
    updateModel: AdminAPI.updateAbout,
    redirect: "/about",
    icon: "users",
    title: "Edit a team member",
    description: "Make changes to a team member's information."
  };

  return <ModelEditor {...props} {...{ history, location, formFields }} />;
}
