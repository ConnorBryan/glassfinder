import React from "react";
import { Card, Image, Button, Icon } from "semantic-ui-react";

function MobileFeatured({
  image,
  title,
  description,
  buttonContent,
  buttonOnClick
}) {
  return (
    <Card.Group>
      <Card fluid raised>
        <Image src={image} />
        <Card.Content textAlign="center">
          <Card.Header as="h1">{title}</Card.Header>
          <Card.Description>{description}</Card.Description>
        </Card.Content>
        <Card.Content
          as={Button}
          content={buttonContent}
          onClick={buttonOnClick}
          color="blue"
          fluid
          extra
        >
          {buttonContent}
          <Icon name="chevron right" />
        </Card.Content>
      </Card>
    </Card.Group>
  );
}

export default MobileFeatured;
