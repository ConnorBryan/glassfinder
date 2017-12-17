import React from "react";
import { Button, Card, Icon, Image, Segment } from "semantic-ui-react";

import config from "../../../config";
import withPageHeader from "../../../atomic/withPageHeader";

function PieceCard(props) {
  return (
    <Card>
      <Image src={props.image} />
      <Card.Content>
        <Card.Header as="h3" className="fancy">
          {props.name}
        </Card.Header>
        <Card.Description>{props.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Card.Description>
          <Icon name="user" /> Made by {props.maker}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Card.Description>
          <Icon name="dollar" /> ${props.price}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Card.Description>
          <Icon name="map pin" /> Located at {props.location}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button className="fancy" fluid>
          <Icon name="download" /> Purchase
        </Button>
      </Card.Content>
    </Card>
  );
}

function ExplorePieces(props) {
  return (
    <Segment.Group>
      <Segment>
        <Card.Group stackable itemsPerRow={3}>
          {config.pieces.map(piece => <PieceCard key={piece.key} {...piece} />)}
        </Card.Group>
      </Segment>
    </Segment.Group>
  );
}

export default withPageHeader(config.pageHeaders.explorePieces, ExplorePieces);
