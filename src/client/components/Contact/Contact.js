import React from "react";
import { withRouter } from "react-router-dom";
import Yup from "yup";

import * as config from "../../../config";
import API from "../../services";
import * as Validators from "../../validators";
import FormScreen from "../FormScreen";

const FIELDS = [
  {
    name: "name",
    type: "text",
    label: "Name",
    placeholder: "Enter your name",
    value: "",
    validation: Yup.string().required("Give us something to call you by!")
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
    name: "message",
    type: "textarea",
    label: "Message",
    placeholder: "Enter a message",
    value: "",
    validation: Yup.string().required("Don't you have something to say?")
  }
];

function Contact({ verbiage, history, displayNotification }) {
  const onSubmit = async ({ name, email, message }) => {
    const wasSuccessful = await API.sendContactMessage(name, email, message);

    if (wasSuccessful) {
      history.push("/");

      return displayNotification(config.CONTACT_MESSAGE_SUCCESS_NOTIFICATION);
    }

    return displayNotification(config.CONTACT_MESSAGE_FAILURE_NOTIFICATION);
  };

  const screenHeader = {
    icon: "send",
    title: verbiage.Contact_title,
    description: verbiage.Contact_description
  };

  const abstractForm = {
    onSubmit,
    fields: FIELDS
  };

  return <FormScreen {...{ screenHeader, abstractForm }} />;
}

export default withRouter(Contact);
