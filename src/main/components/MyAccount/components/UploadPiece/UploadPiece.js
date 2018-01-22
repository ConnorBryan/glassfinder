import React from "react";
import { withRouter, Redirect } from "react-router-dom";
import Yup from "yup";
import { Container, Segment } from "semantic-ui-react";

import { LINK_TYPES, ICON_SET } from "../../../../config";
import API from "../../../../services";
import { removeFromCache } from "../../../../util";
import ScreenHeader from "../../../ScreenHeader";
import AbstractForm from "../../../AbstractForm";

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

function UploadPiece({ verbiage, account, history }) {
  if (!account) return <Redirect to="/sign-in" />;

  const onSubmit = async ({ name, maker, price, description, location }) => {
    const piece = await API.uploadPiece(
      account.id,
      name,
      maker,
      price,
      description,
      location
    );

    // Clear cache to show entry on reloading Pieces view.
    removeFromCache("myPieces", "myPiecesById");

    history.push(`/my-account/view-my-pieces/${piece.id}/upload-image`, {
      piece
    });
  };

  return (
    <Container as={Segment}>
      <ScreenHeader
        icon={ICON_SET[LINK_TYPES.PIECE]}
        title={verbiage.UploadPiece_title}
        description={verbiage.UploadPiece_description}
      />
      <AbstractForm onSubmit={onSubmit} fields={FIELDS} />
    </Container>
  );
}

export default withRouter(UploadPiece);
