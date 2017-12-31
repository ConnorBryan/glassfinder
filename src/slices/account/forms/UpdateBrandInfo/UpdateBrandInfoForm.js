import React from "react";
import { connect } from "react-redux";
import Yup from "yup";

import config from "../../../../config";
import * as Validators from "../../../../validators";
import AbstractForm from "../../../../components/AbstractForm";
import { attemptUpdateInfo } from "../../redux/actions";

const formProps = {
  icon: config.iconSet.brand,
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
  ]
};

function UpdateBrandInfoForm({ link, attemptUpdateInfo }) {
  if (!link) return null;

  const props = {
    ...formProps,
    fields: formProps.fields.map(prop => ({
      ...prop,
      value: link[prop.name] || prop.value
    }))
  };

  const onSubmit = values => attemptUpdateInfo(values);

  return <AbstractForm onSubmit={onSubmit} {...props} />;
}

export default connect(
  state => ({
    link: state.account ? state.account.link : null
  }),
  dispatch => ({
    attemptUpdateInfo: values => dispatch(attemptUpdateInfo(values))
  })
)(UpdateBrandInfoForm);
