import React from "react";
import { connect } from "react-redux";
import Yup from "yup";

import config from "../../../../config";
import * as Validators from "../../../../validators";
import AbstractForm from "../../../../components/AbstractForm";
import { attemptLinkAsArtist } from "../../redux/actions";

const formProps = {
  icon: config.iconSet.artist,
  fields: [
    {
      name: "name",
      type: "text",
      label: "Name",
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

function LinkAsArtistForm(props) {
  const { attemptLinkAsArtist } = props;

  const onSubmit = values => attemptLinkAsArtist(values);

  return <AbstractForm onSubmit={onSubmit} {...formProps} />;
}

export default connect(null, dispatch => ({
  attemptLinkAsArtist: values => dispatch(attemptLinkAsArtist(values))
}))(LinkAsArtistForm);
