import React from "react";
import { withRouter } from "react-router-dom";
import {
  Grid,
  Container,
  Divider,
  Segment,
  Responsive
} from "semantic-ui-react";
import Yup from "yup";
import styled from "styled-components";

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

function FormScreen({ screenHeader, abstractForm }) {
  const header = <ScreenHeader {...screenHeader} />;
  const form = <AbstractForm {...abstractForm} />;

  const Styles = styled.div`
    .mobile {
      padding: 0 1.5rem 0 1.5rem !important;
    }
    .grid {
      padding: 0 3rem 0 3rem !important;
    }
  `;

  return (
    <Styles>
      <Responsive as={Container} maxWidth={Responsive.onlyMobile.maxWidth}>
        <div className="mobile">
          {header}
          <Divider hidden />
          {form}
        </div>
      </Responsive>
      <Responsive
        as={Container}
        minWidth={Responsive.onlyTablet.minWidth}
        fluid
      >
        <Grid>
          <Grid.Row>
            <Grid.Column width={8} stretched>
              {header}
            </Grid.Column>
            <Grid.Column width={8}>{form}</Grid.Column>
          </Grid.Row>
        </Grid>
      </Responsive>
    </Styles>
  );
}
