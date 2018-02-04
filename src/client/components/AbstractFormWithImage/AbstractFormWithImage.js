import React, { Component } from "react";
import PropTypes from "prop-types";

import AbstractForm from "../AbstractForm";
import ImageUpload from "../ImageUpload";

export default class AbstractFormWithImage extends Component {
  static propTypes = {
    abstractForm: PropTypes.shape({
      onSubmit: PropTypes.func.isRequired,
      fields: PropTypes.arrayOf(PropTypes.object).isRequired,
      initialImage: PropTypes.string
    })
  };

  state = {
    stage0Values: null,
    stage: 0
  };

  componentDidMount() {
    const { abstractForm } = this.props;

    this.submit = abstractForm.onSubmit;
  }

  toggleStage = () => {
    this.setState(prevState => ({ stage: prevState.stage === 0 ? 1 : 0 }));
  };

  finish = imagePath => {
    const { stage0Values } = this.state;

    const finalValues = { ...stage0Values, image: imagePath };

    this.submit(finalValues);
  };

  render() {
    const { initialImage, abstractForm } = this.props;
    const { stage } = this.state;

    const modifiedAbstractForm = { ...abstractForm };

    // Going from 0 => saves values, going backward from 1 => 0 does not.
    modifiedAbstractForm.onSubmit = stage0Values => {
      stage === 0
        ? this.setState({ stage0Values }, this.toggleStage)
        : this.toggleStage();
    };

    return stage === 0 ? (
      <AbstractForm sendText="Upload image" {...modifiedAbstractForm} />
    ) : (
      <ImageUpload
        {...{ initialImage }}
        onSubmit={imagePath => this.finish(imagePath)}
      />
    );
  }
}
