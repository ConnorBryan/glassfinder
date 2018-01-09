import React from "react";
import { Link } from "react-router-dom";
import { Item, Button } from "semantic-ui-react";

function DesktopFeatured({
  image,
  description,
  title,
  flipped,
  buttonContent,
  link
}) {
  return (
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
              content={buttonContent}
              size="large"
              floated={flipped ? "left" : "right"}
              primary
            />
          </Item.Extra>
        </Item.Content>
        {flipped && <Item.Image size="large" src={image} circular />}
      </Item>
    </Item.Group>
  );
}

export default DesktopFeatured;
