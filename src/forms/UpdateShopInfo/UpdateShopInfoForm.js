import React from "react";
import PropTypes from "prop-types";
import Yup from "yup";

import config from "../../config";
import * as Validators from "../../validators";
import AbstractForm from "../AbstractForm";

const props = {
  icon: config.iconSet.shop,
  header: "Update shop",
  description: "Make changes to a shop's basic information.",
  fields: [
    {
      name: "name",
      type: "text",
      label: "Business name",
      placeholder: "Enter the name of your establishment",
      value: "",
      validation: Yup.string().required("A business name is required.")
    },
    {
      name: "description",
      type: "textarea",
      label: "Description",
      placeholder: "Tell the world about what your business has to offer",
      value: "",
      validation: Validators.description
    },
    {
      name: "email",
      type: "email",
      label: "Email",
      placeholder: "Enter email",
      value: "",
      validation: Validators.email
    },
    {
      name: "phone",
      type: "text",
      label: "Phone number",
      placeholder: "Enter the business phone number",
      value: "",
      validation: Validators.phone
    },
    {
      name: "street",
      type: "text",
      label: "Street",
      placeholder: "Enter the street address of the business",
      value: "",
      validation: Yup.string().required("A street address is required.")
    },
    {
      name: "city",
      type: "text",
      label: "City",
      placeholder: "Enter the city of the business",
      value: "",
      validation: Yup.string().required("A city is required.")
    },
    {
      name: "state",
      type: "select",
      label: "State",
      placeholder: "Select a state",
      value: "",
      options: [
        { key: "select", value: "", text: "Select a state" },
        ...config.usStates.map(state => ({
          key: state,
          value: state,
          text: state
        }))
      ],
      validation: Yup.string().required("A state must be selected.")
    },
    {
      name: "zip",
      type: "string",
      label: "ZIP",
      placeholder: "Enter the ZIP code of the business",
      value: "",
      validation: Yup.string()
        .matches(/^\d{5}(?:[-\s]\d{4})?$/, "A valid ZIP is required.")
        .required("A valid ZIP is required.")
    }
  ],
  onSubmit: values => {
    alert(`Updating shop with ${JSON.stringify(values, null, 2)}`);
  }
};

function UpdateShopInfoForm({ currentValues }) {
  props.fields = props.fields.map(field => ({
    ...field,
    value: currentValues[field.name] || field.value
  }));

  return <AbstractForm {...props} />;
}

UpdateShopInfoForm.propTypes = {
  currentValues: PropTypes.objectOf(PropTypes.string)
};

UpdateShopInfoForm.defaultProps = {
  currentValues: {}
};

export default UpdateShopInfoForm;
