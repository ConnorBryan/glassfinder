import React from "react";
import Yup from "yup";

import config from "../../config";
import AbstractForm from "../AbstractForm";

const props = {
  icon: config.iconSet.artist,
  header: "Upgrade to artist",
  description:
    "Upload pieces you're selling and show the world what you have to offer.",
  fields: [
    {
      name: "name",
      type: "text",
      label: "Artist name",
      placeholder: "What do you prefer to go by?",
      value: "",
      validation: Yup.string().required("An artist name is required.")
    },
    {
      name: "description",
      type: "textarea",
      label: "Description",
      placeholder: "Tell the world about what you have to offer",
      value: "",
      validation: Yup.string().required(
        "Come on, people want to know what you're all about!"
      )
    },
    {
      name: "from",
      type: "text",
      label: "From",
      placeholder: "Where are you based out of?",
      value: "",
      validation: Yup.string().required(
        "A 'from' location is required. You don't have to get too specific."
      )
    }
  ],
  onSubmit: values => {
    alert(`Upgrading to artist with ${JSON.stringify(values, null, 2)}`);
  }
};

export default function UpgradeToArtistForm() {
  return <AbstractForm {...props} />;
}
