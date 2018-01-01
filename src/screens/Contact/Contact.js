import React from "react";
import { connect } from "react-redux";
import Yup from "yup";

import config from "../../config";
import * as Validators from "../../validators";
import { sendContactMessage } from "../../redux/actions";
import AbstractForm from "../../components/AbstractForm";
import withPageHeader from "../../components/withPageHeader";

const formProps = {
  icon: "envelope",
  fields: [
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
  ]
};

function ContactForm({ sendMessage }) {
  const onSubmit = ({ name, email, message }) =>
    sendMessage(name, email, message);

  return <AbstractForm onSubmit={onSubmit} {...formProps} />;
}

export default connect(null, dispatch => ({
  sendMessage: (name, email, message) =>
    dispatch(sendContactMessage(name, email, message))
}))(withPageHeader(config.pageHeaders.contact, ContactForm));
