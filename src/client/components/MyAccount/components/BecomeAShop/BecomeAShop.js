import React from "react";
import { withRouter, Redirect } from "react-router-dom";
import Yup from "yup";

import * as config from "../../../../../config";
import API from "../../../../services";
import * as Validators from "../../../../validators";
import FormScreen from "../../../FormScreen";

const FIELDS = [
  {
    name: "name",
    type: "text",
    label: "Name",
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
      config.STATES.map(state => ({
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
];

function BecomeAShop({
  verbiage,
  account,
  updateAccount,
  updateAccountLink,
  history,
  displayNotification
}) {
  if (!account) return <Redirect to="/sign-in" />;

  const onSubmit = async values => {
    const { street, city, state, zip } = values;
    const address = window.encodeURIComponent(
      `${street}, ${city}, ${state} ${zip}`
    );
    const coordinates = await API.transformAddressToCoordinates(address);

    if (coordinates) {
      const { lat, lng } = coordinates;

      values.lat = lat;
      values.lng = lng;

      const updatedAccount = await API.becomeAShop(account.id, values);

      if (updatedAccount) {
        updateAccount("linked", true);
        updateAccount("type", updatedAccount.type);
        updateAccountLink(updatedAccount.link);

        history.push("/my-account/upload-image");

        return displayNotification(config.LINK_REQUEST_SUCCESS_NOTIFICATION);
      }

      history.push("/my-account");

      return displayNotification(config.LINK_REQUEST_FAILURE_NOTIFICATION);
    }

    history.push("/my-account");

    return displayNotification(config.BAD_ADDRESS_NOTIFICATION);
  };

  const screenHeader = {
    icon: config.ICON_SET[config.LINK_TYPES.SHOP],
    title: verbiage.BecomeAShop_title,
    description: verbiage.BecomeAShop_description
  };

  const abstractForm = {
    onSubmit,
    fields: FIELDS
  };

  return <FormScreen {...{ screenHeader, abstractForm }} />;
}

export default withRouter(BecomeAShop);
