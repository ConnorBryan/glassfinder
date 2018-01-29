import React, { Component } from "react";
import Yup from "yup";
import { Container, Segment, Loader } from "semantic-ui-react";

import ScreenHeader from "../../../../../main/components/ScreenHeader";
import AbstractForm from "../../../../../main/components/AbstractForm";
import AdminAPI from "../../../../services";
import _fields from "../../fields";

export default class EditAbout extends Component {
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
    const fields = _fields.map(field => ({
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
