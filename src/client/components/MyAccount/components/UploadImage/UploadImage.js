import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import {
  Container,
  Form,
  Button,
  Segment,
  Icon,
  Card,
  Image
} from "semantic-ui-react";
import styled from "styled-components";

import * as config from "../../../../../config";
import API from "../../../../services";
import ScreenHeader from "../../../ScreenHeader";
import UploadField from "../../../../components/AbstractForm/components/UploadField";

const Styles = styled.div`
  .fancy {
    text-transform: uppercase !important;
    letter-spacing: 0.33rem !important;
  }

  .invisible {
    display: none !important;
  }
`;

class UploadImage extends Component {
  state = {
    image: null,
    uploading: false
  };

  setImage = image => this.setState({ image });
  clearImage = () => this.setState({ image: null });
  startUploading = () => this.setState({ uploading: true });
  stopUploading = () => this.setState({ uploading: false });

  isValid = () => {
    const { image } = this.state;

    if (!image) return false;

    return true;
  };

  submit = async () => {
    const {
      account,
      updateAccountLink,
      history,
      displayNotification
    } = this.props;
    const { image } = this.state;

    if (this.isValid()) {
      const link = await API.uploadImage(account.id, image);

      updateAccountLink(link);

      history.push("/my-account");

      return displayNotification(config.UPLOAD_IMAGE_SUCCESS_NOTIFICATION);
    }
    return displayNotification(config.UPLOAD_IMAGE_FAILURE_NOTIFICATION);
  };

  render() {
    const { verbiage, account } = this.props;
    const { uploading } = this.state;

    if (!account) return <Redirect to="/sign-in" />;

    if (!(account.link || account.linked)) return <Redirect to="/my-account" />;

    const { image } = account.link;

    return (
      <Styles>
        <Container as={Segment}>
          <ScreenHeader
            icon="picture"
            title={verbiage.UploadImage_title}
            description={verbiage.UploadImage_description}
          />
          <Segment.Group>
            {image && (
              <Segment attached="top">
                <Card>
                  <Card.Content>
                    <Card.Description textAlign="center" className="fancy">
                      {verbiage.UploadImage_yourCurrentImage}
                    </Card.Description>
                  </Card.Content>
                  <Image src={image} />
                </Card>
              </Segment>
            )}
            <Form as={Segment} attached={image ? "bottom" : "top"}>
              <UploadField label="Image" onUpload={this.setImage} />
            </Form>
            <Segment attached="bottom" color="blue">
              <Button.Group fluid>
                <Button
                  className="fancy"
                  onClick={this.submit}
                  disabled={uploading}
                  primary
                >
                  {verbiage.UploadImage_send} <Icon name="send outline" />
                </Button>
                <Button.Or />
                <Button
                  className="fancy"
                  icon="refresh"
                  onClick={this.clearImage}
                  content="Reset"
                  disabled={uploading}
                />
              </Button.Group>
            </Segment>
          </Segment.Group>
        </Container>
      </Styles>
    );
  }
}

export default withRouter(UploadImage);
