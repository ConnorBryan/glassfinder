import React from "react";
import { Link } from "react-router-dom";
import { Item, Icon, Button, Segment } from "semantic-ui-react";
import styled from "styled-components";

const Styles = styled.div`
  .button {
    margin-top: 3rem !important;
  }
`;

function DesktopFeatured({
  image,
  description,
  title,
  flipped,
  buttonContent,
  link,
  icon
}) {
  return (
    <Styles>
      <Segment padded="very" fluid>
        <Item.Group>
          <Item>
            {!flipped && <Item.Image size="large" src={image} circular />}
            <Item.Content>
              <Item.Header as="h1">{title}</Item.Header>
              <Item.Description>{description}</Item.Description>
              <Item.Extra>
                <Button
                  as={Link}
                  to={link}
                  size="large"
                  floated={flipped ? "left" : "right"}
                  primary
                >
                  <Icon name={icon} /> {buttonContent}
                </Button>
              </Item.Extra>
            </Item.Content>
            {flipped && <Item.Image size="large" src={image} circular />}
          </Item>
        </Item.Group>
      </Segment>
    </Styles>
  );
}

export default DesktopFeatured;
