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
    name: "name",
    type: "text",
    label: "Name",
    placeholder: "Enter the name of the team member",
    value: "",
    validation: Yup.string().required("A team member must have an author.")
  },
  {
    name: "title",
    type: "text",
    label: "Title",
    placeholder: "Enter the title of the team member",
    value: "",
    validation: Yup.string().required("A team member must have a title.")
  },
  {
    name: "description",
    type: "textarea",
    label: "Description",
    placeholder: "Enter a description of the team member",
    value: "",
    validation: Yup.string().required("A team member must have content.")
  }
];

function CreateAbout({ history }) {
  const onSubmit = async values => {
    await AdminAPI.createAbout(values);

    history.push("/about");
  };

  return (
    <Container as={Segment}>
      <ScreenHeader
        icon="users"
        title="Create team member"
        description="Let the world know you're growing."
      />
      <AbstractForm {...{ onSubmit }} fields={FIELDS} />
    </Container>
  );
}

export default CreateAbout;
