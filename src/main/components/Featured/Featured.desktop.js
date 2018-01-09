import React from "react";
import { Item, Button } from "semantic-ui-react";

function DesktopFeatured(props) {
  const {
    image,
    description,
    title,
    flipped,
    buttonContent,
    buttonOnClick
  } = props;

  return (
    <Item.Group>
      <Item>
        {!flipped && <Item.Image size="large" src={image} circular />}
        <Item.Content>
          <Item.Header as="h1">{title}</Item.Header>
          <Item.Description>{description}</Item.Description>
          <Item.Extra>
            <Button
              content={buttonContent}
              onClick={buttonOnClick}
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
