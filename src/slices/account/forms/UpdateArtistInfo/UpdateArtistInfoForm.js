import React from "react";
import { connect } from "react-redux";
import Yup from "yup";

import config from "../../../../config";
import * as Validators from "../../../../validators";
import AbstractForm from "../../../../components/AbstractForm";
import { attemptUpdateInfo } from "../../redux/actions";

const formProps = {
  icon: config.iconSet.artist,
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
  ]
};

function UpdateArtistInfoForm({ link, attemptUpdateInfo }) {
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
)(UpdateArtistInfoForm);
