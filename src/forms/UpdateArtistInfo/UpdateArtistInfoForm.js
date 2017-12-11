import React from "react";
import PropTypes from "prop-types";
import Yup from "yup";

import config from "../../config";
import * as Validators from "../../validators";
import AbstractForm from "../AbstractForm";

const props = {
  icon: config.iconSet.artist,
  header: "Update artist",
  description: "Make changes to an artist's basic information.",
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

function UpdateArtistInfoForm({ currentValues }) {
  props.fields = props.fields.map(field => ({
    ...field,
    value: currentValues[field.name] || field.value
  }));

  return <AbstractForm {...props} />;
}

UpdateArtistInfoForm.propTypes = {
  currentValues: PropTypes.objectOf(PropTypes.string)
};

UpdateArtistInfoForm.defaultProps = {
  currentValues: {}
};

export default UpdateArtistInfoForm;
