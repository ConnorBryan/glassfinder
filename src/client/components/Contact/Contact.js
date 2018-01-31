import React from "react";
import { withRouter } from "react-router-dom";
import { Container, Segment } from "semantic-ui-react";
import Yup from "yup";

import * as config from "../../../config";
import API from "../../services";
import * as Validators from "../../validators";
import ScreenHeader from "../ScreenHeader";
import AbstractForm from "../AbstractForm";

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

  return (
    <Container as={Segment}>
      <ScreenHeader
        icon="send"
        title={verbiage.Contact_title}
        description={verbiage.Contact_description}
      />
      <AbstractForm onSubmit={onSubmit} fields={FIELDS} />
    </Container>
  );
}

export default withRouter(Contact);
