import React from "react";
import { withRouter, Redirect } from "react-router-dom";
import Yup from "yup";
import { Container } from "semantic-ui-react";

import API from "../../../../services";
import * as Validators from "../../../../validators";
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

function UploadPiece({ account, history }) {
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

    console.log(piece);

    history.push("/my-account");
  };

  return (
    <Container>
      <AbstractForm onSubmit={onSubmit} fields={FIELDS} />
    </Container>
  );
}

export default withRouter(UploadPiece);
