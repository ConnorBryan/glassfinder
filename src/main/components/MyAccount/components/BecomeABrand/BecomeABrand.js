import React from "react";
import { withRouter, Redirect } from "react-router-dom";
import { Container } from "semantic-ui-react";
import Yup from "yup";

import API from "../../../../services";
import * as Validators from "../../../../validators";
import AbstractForm from "../../../AbstractForm";

const FIELDS = [
  {
    name: "name",
    type: "text",
    label: "Name",
    placeholder: "Enter the name of your brand",
    value: "",
    validation: Yup.string().required("A brand name is required.")
  },
  {
    name: "description",
    type: "textarea",
    label: "Description",
    placeholder: "Tell the world about what your brand has to offer",
    value: "",
    validation: Validators.description
  },
  {
    name: "from",
    type: "text",
    label: "From",
    placeholder: "Where are you based out of?",
    value: "",
    validation: Yup.string().required(
      "A 'from' location is required. You don't have to get too specific."
    )
  },
  {
    name: "site",
    type: "text",
    label: "Site",
    placeholder: "Where can we find you on the web?",
    value: "",
    validation: Yup.string().matches(
      /[-a-zA-Z0-9@:%._~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&//=]*)/,
      "A brand website must be a valid URL."
    )
  }
];

function BecomeABrand({ account, updateAccountLink, history }) {
  if (!account) return <Redirect to="/sign-in" />;

  const onSubmit = async values => {
    const link = await API.becomeABrand(account.id, values);

    if (link) updateAccountLink(link);

    history.push("/my-account");
  };

  return (
    <Container>
      <AbstractForm onSubmit={onSubmit} fields={FIELDS} />
    </Container>
  );
}

export default withRouter(BecomeABrand);
