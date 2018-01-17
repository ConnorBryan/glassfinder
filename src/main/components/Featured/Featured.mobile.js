import React from "react";
import { Link } from "react-router-dom";
import { Card, Image, Button, Icon } from "semantic-ui-react";
import styled from "styled-components";

const Styles = styled.div`
  a {
    text-transform: uppercase !important;
    letter-spacing: 0.33rem !important;
  }
`;

function MobileFeatured({ image, title, description, buttonContent, link }) {
  return (
    <Styles>
      <Card.Group>
        <Card fluid raised>
          <Image src={image} />
          <Card.Content textAlign="center">
            <Card.Header as="h1">{title}</Card.Header>
            <Card.Description>{description}</Card.Description>
          </Card.Content>
          <Card.Content>
            <Button as={Link} to={link} color="blue" fluid>
              {buttonContent}
              <Icon name="chevron right" />
            </Button>
          </Card.Content>
        </Card>
      </Card.Group>
    </Styles>
  );
}

export default MobileFeatured;
