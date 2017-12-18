import React from "react";
import Yup from "yup";

import AbstractForm from "../../../../abstracts/AbstractForm";

const props = {
  icon: "book",
  header: "Upload a catalog",
  fields: [
    {
      name: "catalog",
      type: "file",
      label: "Catalog",
      value: "",
      validation: Yup.object().required("A catalog is required.")
    }
  ],
  onSubmit: values => {
    alert(`Uploading catalog ${JSON.stringify(values, null, 2)}`);
  }
};

export default function UploadCatalogForm() {
  return <AbstractForm {...props} />;
}
