import React from "react";
import { withRouter, Redirect } from "react-router-dom";
import { Container, Segment } from "semantic-ui-react";
import Yup from "yup";

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

function UpdatePieceInformation({
  verbiage,
  account,
  history,
  location: { state }
}) {
  if (!account) return <Redirect to="/sign-in" />;

  if (!state.piece) return <Redirect to="/my-account/view-my-pieces" />;

  const fields = FIELDS.map(prop => ({
    ...prop,
    value: state.piece[prop.name] || prop.value
  }));

  const onSubmit = async values => {
    await API.updatePieceInformation(state.piece.id, values);

    // Clear cache to show entry on reloading Pieces view.
    removeFromCache("myPieces", "myPiecesById");

    history.push("/my-account");
  };

  return (
    <Container as={Segment}>
      <ScreenHeader
        icon={ICON_SET[LINK_TYPES.PIECE]}
        title={verbiage.UpdatePieceInformation_title}
        description={verbiage.UpdatePieceInformatione_description}
      />
      <AbstractForm onSubmit={onSubmit} fields={fields} />
    </Container>
  );
}

export default withRouter(UpdatePieceInformation);
