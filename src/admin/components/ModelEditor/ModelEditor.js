import React, { Component } from "react";
import PropTypes from "prop-types";
import { Container, Segment, Loader } from "semantic-ui-react";

import ScreenHeader from "../../../client/components/ScreenHeader";
import AbstractForm from "../../../client/components/AbstractForm";

export default class ModelEditor extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    fetchModel: PropTypes.func.isRequired,
    updateModel: PropTypes.func.isRequired,
    formFields: PropTypes.arrayOf(PropTypes.object).isRequired,
    redirect: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  };

  state = {
    loading: false,
    fetched: false,
    model: null
  };

  componentDidMount() {
    this.setModel();
  }

  setModel = () => {
    const { location: { pathname }, fetchModel } = this.props;
    const id = pathname.split("/")[2];

    this.setState({ loading: true }, async () => {
      this.setState({
        model: await fetchModel(id),
        loading: false,
        fetched: true
      });
    });
  };

  render() {
    const {
      history,
      location: { pathname },
      formFields,
      updateModel,
      redirect,
      icon,
      title,
      description
    } = this.props;
    const { loading, fetched, model } = this.state;
    const id = pathname.split("/")[2];
    const fields = formFields.map(field => ({
      ...field,
      value: model ? model[field.name] : field.value
    }));
    const onSubmit = async values => {
      await updateModel(id, values);

      history.push(redirect);
    };

    return (
      <Container as={Segment}>
        <ScreenHeader {...{ icon, title, description }} />
        {loading || !fetched ? (
          <Loader active />
        ) : (
          <AbstractForm {...{ fields, onSubmit }} />
        )}
      </Container>
    );
  }
}
