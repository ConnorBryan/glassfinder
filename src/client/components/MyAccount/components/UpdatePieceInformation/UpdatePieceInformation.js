import React from "react";
import { withRouter, Redirect } from "react-router-dom";
import { Container, Segment } from "semantic-ui-react";
import Yup from "yup";

import * as config from "../../../../../config";
import { removeFromCache } from "../../../../../util";
import API from "../../../../services";
import FormScreen from "../../../FormScreen";

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
      // Clear cache to show entry on reloading Pieces view.
      removeFromCache("myPieces", "myPiecesById");

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
    fields: FIELDS
  };

  return <FormScreen {...{ screenHeader, abstractForm }} />;
}

export default withRouter(UpdatePieceInformation);
