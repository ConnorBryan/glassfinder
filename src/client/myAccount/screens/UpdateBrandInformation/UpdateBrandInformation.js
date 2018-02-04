import React from "react";
import { withRouter, Redirect } from "react-router-dom";
import Yup from "yup";

import * as config from "../../../../config";
import API from "../../../services";
import * as Validators from "../../../validators";
import FormScreen from "../../../components/FormScreen";

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
  history,
  displayNotification
}) {
  if (!account) return <Redirect to="/sign-in" />;

  const fields = FIELDS.map(prop => ({
    ...prop,
    value: account.link[prop.name] || prop.value
  }));

  const onSubmit = async values => {
    const link = await API.updateInformation(account.id, values);

    if (link) {
      updateAccountLink(link);

      history.push("/my-account");

      return displayNotification(
        config.UPDATE_INFORMATION_SUCCESS_NOTIFICATION
      );
    }

    return displayNotification(config.UPDATE_INFORMATION_FAILURE_NOTIFICATION);
  };

  const screenHeader = {
    icon: config.ICON_SET[config.LINK_TYPES.BRAND],
    title: verbiage.UpdateBrandInformation_title,
    description: verbiage.UpdateBrandInformation_description
  };

  const abstractForm = {
    onSubmit,
    fields
  };

  const initialImage = account && account.link && account.link.image;

  return (
    <FormScreen
      withImage
      {...{
        splash: config.BRAND_SPLASH,
        initialImage,
        screenHeader,
        abstractForm
      }}
    />
  );
}

export default withRouter(UpdateBrandInformation);
