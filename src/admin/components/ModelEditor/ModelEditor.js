import React, { Component } from "react";
import PropTypes from "prop-types";

import FormScreen from "../../../client/components/FormScreen";

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
    const { model } = this.state;
    const id = pathname.split("/")[2];
    const fields = formFields.map(field => ({
      ...field,
      value: model ? model[field.name] : field.value
    }));
    const onSubmit = async values => {
      await updateModel(id, values);

      history.push(redirect);
    };

    const screenHeader = { icon, title, description };
    const abstractForm = { fields, onSubmit };

    return <FormScreen {...{ screenHeader, abstractForm }} />;
  }
}
