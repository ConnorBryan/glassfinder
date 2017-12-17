import React from "react";
import Yup from "yup";

import config from "../../../../config";
import * as Validators from "../../../../validators";
import AbstractUpdateForm from "../../../../forms/AbstractUpdateForm";

const props = {
  icon: config.iconSet.artist,
  header: "Update artist",
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
      validation: Validators.description
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
    alert(`Updating artist with ${JSON.stringify(values, null, 2)}`);
  }
};

export default function UpdateArtistInfoForm({ currentValues }) {
  return (
    <AbstractUpdateForm originalProps={props} currentValues={currentValues} />
  );
}
