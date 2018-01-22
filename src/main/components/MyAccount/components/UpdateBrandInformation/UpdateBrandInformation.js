import React from "react";
import { withRouter, Redirect } from "react-router-dom";
import { Container } from "semantic-ui-react";
import Yup from "yup";

import { LINK_TYPES, ICON_SET } from "../../../../config";
import API from "../../../../services";
import * as Validators from "../../../../validators";
import ScreenHeader from "../../../ScreenHeader";
import AbstractForm from "../../../AbstractForm";

const FIELDS = [
  {
    name: "name",
    type: "text",
    label: "Brand name",
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
    label: "Web site",
    placeholder: "Where are you based out of?",
    value: "",
    validation: Yup.string().matches(
      /[-a-zA-Z0-9@:%._~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&//=]*)/,
      "A brand website must be a valid URL."
    )
  }
];

function UpdateBrandInformation({
  verbiage,
  account,
  updateAccountLink,
  history
}) {
  if (!account) return <Redirect to="/sign-in" />;

  const fields = FIELDS.map(prop => ({
    ...prop,
    value: account.link[prop.name] || prop.value
  }));

  const onSubmit = async values => {
    const link = await API.updateInformation(account.id, values);

    if (link) updateAccountLink(link);

    history.push("/my-account");
  };

  return (
    <Container>
      <ScreenHeader
        icon={ICON_SET[LINK_TYPES.BRAND]}
        title={verbiage.UpdateBrandInformation_title}
        description={verbiage.UpdateBrandInformation_description}
      />
      <AbstractForm onSubmit={onSubmit} fields={fields} />
    </Container>
  );
}

export default withRouter(UpdateBrandInformation);
