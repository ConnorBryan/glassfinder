import React from "react";
import Yup from "yup";
import { Container, Segment } from "semantic-ui-react";

import ScreenHeader from "../../../../../main/components/ScreenHeader";
import AbstractForm from "../../../../../main/components/AbstractForm";
import AdminAPI from "../../../../services";

const FIELDS = [
  {
    name: "image",
    type: "text",
    label: "Image URL",
    placeholder: "Enter an image URL, such as one from Imgur",
    value: "",
    validation: Yup.string().matches(
      /[-a-zA-Z0-9@:%._~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&//=]*)/,
      "An image must have a valid URL."
    )
  },
  {
    name: "title",
    type: "text",
    label: "Title",
    placeholder: "Enter the title of the update",
    value: "",
    validation: Yup.string().required("An update must have a title.")
  },
  {
    name: "content",
    type: "textarea",
    label: "Content",
    placeholder: "Enter the content of the update",
    value: "",
    validation: Yup.string().required("An update must have content.")
  },
  {
    name: "author",
    type: "text",
    label: "Author",
    placeholder: "Enter the author of the update",
    value: "",
    validation: Yup.string().required("An update must have an author.")
  }
];

function CreateUpdate({ history }) {
  const onSubmit = async values => {
    await AdminAPI.createUpdate(values);

    history.push("/updates");
  };

  return (
    <Container as={Segment}>
      <ScreenHeader
        icon="newspaper"
        title="Create update"
        description="Keep your users informed and up to date."
      />
      <AbstractForm {...{ onSubmit }} fields={FIELDS} />
    </Container>
  );
}

export default CreateUpdate;
