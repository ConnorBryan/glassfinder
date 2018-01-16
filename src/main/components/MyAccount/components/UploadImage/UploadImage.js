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

import API from "../../../../services";
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

  submit = () => {
    const { account } = this.props;
    const { image } = this.state;

    if (this.isValid()) API.uploadImage(account.id, image);
  };

  render() {
    const { account } = this.props;
    const { uploading } = this.state;

    if (!account) return <Redirect to="/sign-in" />;

    if (!account.linked) return <Redirect to="/my-account" />;

    const { image } = account.link;

    return (
      <Styles>
        <Container>
          <Segment.Group>
            {image && (
              <Segment attached="top">
                <Card>
                  <Card.Content>
                    <Card.Description textAlign="center" className="fancy">
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
            <Segment attached="bottom" color="blue">
              <Button.Group fluid>
                <Button
                  icon="refresh"
                  onClick={this.clearImage}
                  content="Reset"
                  disabled={uploading}
                />
                <Button.Or />
                <Button onClick={this.submit} disabled={uploading} primary>
                  Send <Icon name="send outline" />
                </Button>
              </Button.Group>
            </Segment>
          </Segment.Group>
        </Container>
      </Styles>
    );
  }
}

export default withRouter(UploadImage);
