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
import { retrieveFromCache, removeFromCache } from "../../../../util";
import UploadField from "../../../../components/AbstractForm/components/UploadField";

const Styles = styled.div`
  .fancy,
  .button {
    text-transform: uppercase !important;
    letter-spacing: 0.33rem !important;
  }

  .invisible {
    display: none !important;
  }
`;

class UploadPieceImage extends Component {
  constructor(props) {
    super(props);

    const { location: { pathname, state } } = props;
    const id = pathname.split("/")[3];
    const inMyPieces = retrieveFromCache("myPiecesById");
    const inPieces = retrieveFromCache("piecesById");
    const iterable = inMyPieces || inPieces || "[]";
    const mappable = JSON.parse(iterable);
    const map = new Map([...mappable]);
    const piece = state.piece || map.get(id) || {};

    this.state = {
      id,
      piece,
      image: null,
      uploading: false
    };
  }

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
    const { history } = this.props;
    const { id, image } = this.state;

    if (this.isValid()) {
      await API.uploadPieceImage(id, image);

      // Clear cache to show entry on reloading Pieces view.
      removeFromCache("myPieces", "myPiecesById");

      history.push("/my-account/view-my-pieces");
    }
  };

  render() {
    const { account } = this.props;
    const { piece, uploading } = this.state;

    if (!account) return <Redirect to="/sign-in" />;

    if (!account.linked) return <Redirect to="/my-account" />;

    const { name, image } = piece;

    return (
      <Styles>
        <Container>
          <Segment.Group>
            {image && (
              <Segment attached="top">
                <Card>
                  <Card.Content>
                    <Card.Description textAlign="center" className="fancy">
                      {name}'s current image
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
                <Button onClick={this.submit} disabled={uploading} primary>
                  Send <Icon name="send outline" />
                </Button>
                <Button.Or />
                <Button
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

export default withRouter(UploadPieceImage);
