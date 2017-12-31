import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Button, Segment, Icon, Card, Image } from "semantic-ui-react";
import styled from "styled-components";

import config from "../../../../config";
import UploadField from "../../../../components/UploadField";
import { attemptUploadImage } from "../../redux/actions";

const FancyButton = props => <Button as={Fancy} {...props} />;

class UploadImageForm extends Component {
  state = {
    image: null,
    uploading: false
  };

  setImage = image => this.setState({ image });

  clearImage = () => this.setState({ image: null });

  startUploading = () => this.setState({ uploading: true });

  stopUploading = () => this.setState({ uploading: false });

  validate = () => {
    const { image } = this.state;

    if (!image) return false;

    return true;
  };

  submit = () => {
    const { attemptUploadImage } = this.props;
    const { image } = this.state;

    if (this.validate()) attemptUploadImage(image);
  };

  render() {
    const { image } = this.props;
    const { uploading } = this.state;

    return (
      <Segment.Group>
        {image && (
          <Segment attached="top">
            <Card>
              <Card.Content>
                <Card.Description className="fancy">
                  Your current image
                </Card.Description>
              </Card.Content>
              <Image src={image} />
            </Card>
          </Segment>
        )}
        <Form as={Segment} attached={image ? "bottom" : "top"}>
          <UploadField label="Image" onUpload={this.setImage} />
        </Form>
        <Segment attached="bottom" color={config.color}>
          <Button.Group fluid>
            <FancyButton
              icon="refresh"
              onClick={this.clearImage}
              content="Reset"
              disabled={uploading}
            />
            <Button.Or />
            <FancyButton onClick={this.submit} disabled={uploading} primary>
              Send <Icon name="send outline" />
            </FancyButton>
          </Button.Group>
        </Segment>
      </Segment.Group>
    );
  }
}

export default connect(
  state => ({
    image:
      state.account && state.account.linked ? state.account.link.image : null
  }),
  dispatch => ({
    attemptUploadImage: image => dispatch(attemptUploadImage(image))
  })
)(UploadImageForm);

/* Styling */

const I = "!important";

const Fancy = styled.div`
  text-transform: uppercase ${I};
  letter-spacing: 0.33rem ${I};
`;
