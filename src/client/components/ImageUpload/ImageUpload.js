import React, { Component } from "react";
import PropTypes from "prop-types";
import { Segment, Image, Menu, Divider } from "semantic-ui-react";
import styled from "styled-components";
import Aux from "react-aux";
import uuid from "uuid/v4";

import API from "../../services";
import { fancy, slightlyBiggerText, centered } from "../../styles/snippets";

const Styles = styled.div`
  .ImageUpload-menu {
    border: 1px solid white !important;
    margin-top: 0 !important;
    margin-bottom: 0 !important;

    .item {
      ${fancy};
    }
  }

  .ImageUpload-content {
    border: 1px solid white !important;
    min-height: 30vh !important;
    ${slightlyBiggerText} ${centered};

    > .segment {
      padding-top: 0 !important;
    }

    p {
      text-align: center !important;
    }
  }
`;

export default class ImageUpload extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    initialImage: PropTypes.string
  };

  state = {
    image: null,
    imagePath: this.props.initialImage || null,
    initiallyHadImage: !!this.props.initialImage,
    uploading: false,
    ready: false
  };

  id = uuid();

  setImage = () => {
    const image = this.input.files[0];

    this.setState({ image });
  };
  clearImage = () => this.setState({ image: null });
  startUploading = () => this.setState({ uploading: true });
  stopUploading = () => this.setState({ uploading: false });
  isValid = () => !!this.state.image;

  uploadImage = async () => {
    const { image } = this.state;

    if (this.isValid()) {
      const imagePath = await API.genericImageUpload(image);

      return this.setState({ imagePath, ready: true });
    }
  };

  finish = () => {
    const { onSubmit } = this.props;
    const { imagePath, initiallyHadImage, ready } = this.state;

    if (ready || initiallyHadImage) {
      onSubmit(imagePath);
    }
  };

  render() {
    const { image, imagePath, initiallyHadImage, ready } = this.state;

    const formContentText = image ? (
      <p>
        You've selected an image. <br /> Click "Send" below to upload to the
        server, or click "Clear" to pick a different image.
      </p>
    ) : (
      <p>Click "Upload" below to select an image.</p>
    );

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
      <Segment basic>
        <Divider horizontal inverted>
          Your image
        </Divider>
        <Image src={imagePath} size="large" centered />
      </Segment>
    ) : (
      formContentText
    );

    const actions = ready ? (
      <Menu className="ImageUpload-menu" inverted widths={1}>
        <Menu.Item icon="checkmark" content="Finish" onClick={this.finish} />
      </Menu>
    ) : (
      <Aux>
        <Menu className="ImageUpload-menu" widths={2} inverted>
          {uploadButton}
          {clearButton}
        </Menu>
        {initiallyHadImage && (
          <Menu className="ImageUpload-menu" widths={1} inverted>
            <Menu.Item
              icon="checkmark"
              content="Keep current image"
              onClick={this.finish}
            />
          </Menu>
        )}
      </Aux>
    );

    return (
      <Styles>
        <input
          ref={node => (this.input = node)}
          type="file"
          id={this.id}
          style={{ display: "none" }}
          onChange={this.setImage}
        />
        <label ref={node => (this.label = node)} htmlFor={this.id} />
        <Menu className="ImageUpload-menu" inverted widths={1}>
          <Menu.Item header icon="picture" content="Upload image" />
        </Menu>
        <Segment className="ImageUpload-content" inverted>
          {formContent}
        </Segment>
        {actions}
      </Styles>
    );
  }
}
