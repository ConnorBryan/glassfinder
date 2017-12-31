import React from "react";
import Yup from "yup";

import * as Validators from "../../../../validators";
import AbstractForm from "../../../../components/AbstractForm";

const props = {
  icon: "envelope",
  header: "Contact us",
  description: "Shoot us a message if there's anything we can do for you.",
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
  ],
  onSubmit: values => {
    alert(`Contacting with ${JSON.stringify(values, null, 2)}`);
  }
};

export default function ContactForm() {
  return <AbstractForm {...props} />;
}
