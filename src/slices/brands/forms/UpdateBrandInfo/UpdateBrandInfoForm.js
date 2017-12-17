import React from "react";
import Yup from "yup";

import config from "../../../../config";
import * as Validators from "../../../../validators";
import AbstractUpdateForm from "../../../../abstracts/AbstractUpdateForm";

const props = {
  icon: config.iconSet.brand,
  header: "Update brand",
  fields: [
    {
      name: "name",
      type: "text",
      label: "Brand name",
      placeholder: "Enter the name of your brand",
      value: "",
      validation: Yup.string().required("A brand name is required.")
    },
    {
      name: "description",
      type: "textarea",
      label: "Description",
      placeholder: "Tell the world about what your brand has to offer",
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
    },
    {
      name: "site",
      type: "text",
      label: "Web site",
      placeholder: "Where are you based out of?",
      value: "",
      validation: Yup.string().matches(
        /[-a-zA-Z0-9@:%._~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&//=]*)/,
        "A brand website must be a valid URL."
      )
    }
  ],
  onSubmit: values => {
    alert(`Updating shop with ${JSON.stringify(values, null, 2)}`);
  }
};

export default function UpdateBrandInfoForm({ currentValues }) {
  return (
    <AbstractUpdateForm originalProps={props} currentValues={currentValues} />
  );
}
