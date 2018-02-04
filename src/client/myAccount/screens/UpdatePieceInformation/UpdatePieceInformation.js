import React from "react";
import { withRouter, Redirect } from "react-router-dom";
import Yup from "yup";

import * as config from "../../../../config";
import API from "../../../services";
import FormScreen from "../../../components/FormScreen";

const FIELDS = [
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
    type: "textarea",
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
];

function UpdatePieceInformation({
  verbiage,
  account,
  history,
  location: { state },
  displayNotification
}) {
  if (!account) return <Redirect to="/sign-in" />;

  if (!state.piece) return <Redirect to="/my-account/view-my-pieces" />;

  const fields = FIELDS.map(prop => ({
    ...prop,
    value: state.piece[prop.name] || prop.value
  }));

  const onSubmit = async values => {
    const wasSuccessful = await API.updatePieceInformation(
      state.piece.id,
      values
    );

    if (wasSuccessful) {
      history.push("/my-account");

      return displayNotification(
        config.UPDATE_INFORMATION_SUCCESS_NOTIFICATION
      );
    }

    return displayNotification(config.UPDATE_INFORMATION_FAILURE_NOTIFICATION);
  };

  const screenHeader = {
    icon: config.ICON_SET[config.LINK_TYPES.PIECE],
    title: verbiage.UpdatePieceInformation_title,
    description: verbiage.UpdatePieceInformatione_description
  };

  const abstractForm = {
    onSubmit,
    fields
  };

  const initialImage = state.piece && state.piece.image;

  return (
    <FormScreen
      withImage
      {...{
        splash: config.PIECE_SPLASH,
        initialImage,
        screenHeader,
        abstractForm
      }}
    />
  );
}

export default withRouter(UpdatePieceInformation);
