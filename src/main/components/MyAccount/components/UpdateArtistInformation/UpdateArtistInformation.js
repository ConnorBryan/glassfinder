import React from "react";
import { withRouter, Redirect } from "react-router-dom";
import { Container, Segment } from "semantic-ui-react";
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
    label: "Artist name",
    placeholder: "What do you prefer to go by?",
    value: "",
    validation: Yup.string().required("An artist name is required.")
  },
  {
    name: "description",
    type: "textarea",
    label: "Description",
    placeholder: "Tell the world about what you have to offer",
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
  }
];

function UpdateArtistInformation({
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
        icon={ICON_SET[LINK_TYPES.ARTIST0]}
        title={verbiage.UpdateArtistInformation_title}
        description={verbiage.UpdateArtistInformation_description}
      />
      <Segment>
        <AbstractForm onSubmit={onSubmit} fields={fields} />
      </Segment>
    </Container>
  );
}

export default withRouter(UpdateArtistInformation);
