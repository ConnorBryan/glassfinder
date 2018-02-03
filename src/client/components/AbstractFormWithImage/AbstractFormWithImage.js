import React, { Component } from "react";
import PropTypes from "prop-types";
import { Segment, Responsive, Image, Menu } from "semantic-ui-react";
import Aux from "react-aux";
import uuid from "uuid/v4";

import * as config from "../../../config";
import API from "../../services";
import AbstractForm from "../AbstractForm";

export class ImageUpload extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    displayNotification: PropTypes.func.isRequired
  };

  state = {
    image: null,
    imagePath: null,
    uploading: false,
    ready: false
  };

  id = uuid();

  setImage = () => {
    const { displayNotification } = this.props;

    const image = this.input.files[0];

    this.setState({ image }, () =>
      displayNotification(config.SELECTED_IMAGE_NOTIFICATION)
    );
  };
  clearImage = () => this.setState({ image: null });
  startUploading = () => this.setState({ uploading: true });
  stopUploading = () => this.setState({ uploading: false });
  isValid = () => !!this.state.image;

  uploadImage = async () => {
    const { displayNotification, onSubmit } = this.props;
    const { image } = this.state;

    if (this.isValid()) {
      const imagePath = await API.genericImageUpload(image);

      return this.setState({ imagePath, ready: true }, () =>
        displayNotification(config.UPLOADED_IMAGE_NOTIFICATION)
      );
    }

    return displayNotification(config.INVALID_IMAGE_UPLOAD_NOTIFICATION);
  };

  finish = () => {
    const { onSubmit } = this.props;
    const { imagePath, ready } = this.state;

    if (ready) {
      onSubmit(imagePath);
    }
  };

  render() {
    const { image, imagePath, ready } = this.state;

    const formContentText = image
      ? `You've selected an image. Click "Send" below to upload to the server, or click "Clear" to pick a different image.`
      : `Click "Upload" below to select an image.`;

    const uploadButton = image ? (
      <Menu.Item icon="send" content="Send" onClick={this.uploadImage} />
    ) : (
      <Menu.Item
        icon="upload"
        content="Upload"
        onClick={() => this.label.click()}
      />
    );

    const clearButton = (
      <Menu.Item icon="close" content="Clear" onClick={this.clearImage} />
    );

    const formContent = imagePath ? (
      <Image src={imagePath} fluid />
    ) : (
      <p>{formContentText}</p>
    );

    const actions = ready ? (
      <Menu inverted widths={1}>
        <Menu.Item icon="send" content="Finish" onClick={this.finish} />
      </Menu>
    ) : (
      <Aux>
        <Responsive as={Menu} maxWidth={Responsive.onlyMobile.maxWidth}>
          {uploadButton}
        </Responsive>
        <Responsive as={Menu} maxWidth={Responsive.onlyMobile.maxWidth}>
          {clearButton}
        </Responsive>
        <Responsive
          as={Menu}
          minWidth={Responsive.onlyTablet.minWidth}
          widths={2}
          inverted
        >
          {uploadButton}
          {clearButton}
        </Responsive>
      </Aux>
    );

    return (
      <Aux>
        <input
          ref={node => (this.input = node)}
          type="file"
          id={this.id}
          style={{ display: "none" }}
          onChange={this.setImage}
        />
        <label ref={node => (this.label = node)} htmlFor={this.id} />
        <Menu inverted widths={1}>
          <Menu.Item header icon="picture" content="Upload image" />
        </Menu>
        <Segment inverted>{formContent}</Segment>
        {actions}
      </Aux>
    );
  }
}

export default class AbstractFormWithImage extends Component {
  static propTypes = {
    displayNotification: PropTypes.func.isRequired,
    abstractForm: PropTypes.shape({
      onSubmit: PropTypes.func.isRequired,
      fields: PropTypes.arrayOf(PropTypes.object).isRequired
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
    const { displayNotification, abstractForm } = this.props;
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
        {...{ displayNotification }}
        onSubmit={imagePath => this.finish(imagePath)}
      />
    );
  }
}
