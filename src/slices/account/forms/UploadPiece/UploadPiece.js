import React from "react";
import { connect } from "react-redux";
import Yup from "yup";

import AbstractForm from "../../../../components/AbstractForm";
import { attemptUploadPiece } from "../../redux/actions";

const formProps = {
  fields: [
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
  ]
};

function UploadPieceForm(props) {
  const { attemptUploadPiece } = props;

  const onSubmit = ({ name, maker, price, description, location }) =>
    attemptUploadPiece(name, maker, price, description, location);

  return <AbstractForm onSubmit={onSubmit} {...formProps} />;
}

export default connect(null, dispatch => ({
  attemptUploadPiece: (name, maker, price, description, location) =>
    dispatch(attemptUploadPiece(name, maker, price, description, location))
}))(UploadPieceForm);
