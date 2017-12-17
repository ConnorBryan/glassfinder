import React from "react";
import Yup from "yup";

import AbstractForm from "../../../../abstracts/AbstractForm";

const props = {
  icon: "puzzle",
  header: "Upload piece",
  fields: [
    {
      name: "name",
      type: "text",
      label: "Name",
      placeholder: "Enter name",
      value: "",
      validation: Yup.string().required("A name is required.")
    },
    {
      name: "maker",
      type: "text",
      label: "Maker",
      placeholder: "Enter maker",
      value: "",
      validation: Yup.string().required("A maker is required.")
    },
    {
      name: "price",
      type: "number",
      label: "Price",
      placeholder: "Enter price",
      value: "",
      validation: Yup.number()
        .positive("A price must be a positive amount.")
        .required("A price is required.")
    },
    {
      name: "description",
      type: "text",
      label: "Description",
      placeholder: "Enter description",
      value: "",
      validation: Yup.string().required("A description is required.")
    },
    {
      name: "location",
      type: "text",
      label: "Location",
      placeholder: "Enter location",
      value: "",
      validation: Yup.string().required("A location is required.")
    }
  ],
  onSubmit: values => {
    alert(`Uploading piece with ${JSON.stringify(values, null, 2)}`);
  }
};

export default function UploadPieceForm() {
  return <AbstractForm {...props} />;
}
