import React from "react";
import { withRouter, Redirect } from "react-router-dom";
import { Container, Segment } from "semantic-ui-react";
import Yup from "yup";

import * as config from "../../../../../config";
import API from "../../../../services";
import * as Validators from "../../../../validators";
import ScreenHeader from "../../../ScreenHeader";
import AbstractForm from "../../../AbstractForm";

const FIELDS = [
  {
    name: "name",
    type: "text",
    label: "Name",
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

function BecomeAnArtist({
  verbiage,
  account,
  updateAccount,
  updateAccountLink,
  history,
  displayNotification
}) {
  if (!account) return <Redirect to="/sign-in" />;

  const onSubmit = async values => {
    const updatedAccount = await API.becomeAnArtist(account.id, values);

    if (updatedAccount) {
      updateAccount("linked", true);
      updateAccount("type", updatedAccount.type);
      updateAccountLink(updatedAccount.link);

      history.push("/my-account/upload-image");

      return displayNotification(config.LINK_REQUEST_SUCCESS_NOTIFICATION);
    }

    history.push("/my-account");

    return displayNotification(config.LINK_REQUEST_FAILURE_NOTIFICATION);
  };

  return (
    <Container as={Segment}>
      <ScreenHeader
        icon={config.ICON_SET[config.LINK_TYPES.ARTIST]}
        title={verbiage.BecomeAnArtist_title}
        description={verbiage.BecomeAnArtist_description}
      />
      <AbstractForm onSubmit={onSubmit} fields={FIELDS} />
    </Container>
  );
}

export default withRouter(BecomeAnArtist);
