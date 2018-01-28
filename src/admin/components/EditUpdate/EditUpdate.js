import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import Yup from "yup";
import { Container, Segment, Loader } from "semantic-ui-react";

import ScreenHeader from "../../../main/components/ScreenHeader";
import AbstractForm from "../../../main/components/AbstractForm";
import AdminAPI from "../../services";

const FIELDS = [
  {
    name: "image",
    type: "text",
    label: "Image URL",
    placeholder: "Enter an image URL, such as one from Imgur",
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
    validation: Yup.string().required("An update must have a title.")
  },
  {
    name: "content",
    type: "textarea",
    label: "Content",
    placeholder: "Enter the content of the update",
    validation: Yup.string().required("An update must have content.")
  },
  {
    name: "author",
    type: "text",
    label: "Author",
    placeholder: "Enter the author of the update",
    validation: Yup.string().required("An update must have an author.")
  }
];

export default class EditUpdate extends Component {
  state = {
    loading: false,
    fetched: false,
    update: null
  };

  componentDidMount() {
    this.setUpdate();
  }

  setUpdate = () => {
    const { location: { pathname } } = this.props;
    const id = pathname.split("/")[2];

    this.setState({ loading: true }, async () => {
      this.setState(
        {
          update: await AdminAPI.fetchUpdate(id)
        },
        () => {
          this.setState({ loading: false, fetched: true });
        }
      );
    });
  };

  render() {
    const { history, location: { pathname } } = this.props;
    const { loading, fetched, update } = this.state;
    const id = pathname.split("/")[2];
    const fields = FIELDS.map(field => ({
      ...field,
      value: update ? update[field.name] : field.value
    }));
    const onSubmit = async values => {
      await AdminAPI.updateUpdate(id, values);

      history.push("/updates");
    };

    return (
      <Container as={Segment}>
        <ScreenHeader
          icon="newspaper"
          title="Edit update"
          description="Make changes to a previous update."
        />
        {loading || !fetched ? (
          <Loader active />
        ) : (
          <AbstractForm {...{ fields, onSubmit }} />
        )}
      </Container>
    );
  }
}
