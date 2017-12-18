import React from "react";
import Yup from "yup";

import config from "../../../../config";
import * as Validators from "../../../../validators";
import AbstractForm from "../../../../abstracts/AbstractForm";

const props = {
  icon: config.iconSet.brand,
  header: "Upgrade to brand",
  fields: [
    {
      name: "name",
      type: "text",
      label: "Name",
      placeholder: "Enter the name of your brand",
      value: "",
      validation: Yup.string().required("A brand name is required.")
    },
    {
      name: "picture",
      type: "file",
      label: "Picture",
      value: "",
      validation: Validators.picture
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
      label: "Site",
      placeholder: "Where can we find you on the web?",
      value: "",
      validation: Yup.string().matches(
        /[-a-zA-Z0-9@:%._~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&//=]*)/,
        "A brand website must be a valid URL."
      )
    }
  ],
  onSubmit: values => {
    alert(`Upgrading to brand with ${JSON.stringify(values, null, 2)}`);
  }
};

export default function UpgradeToBrandForm() {
  return <AbstractForm {...props} />;
}
