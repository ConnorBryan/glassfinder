import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Button, Card, Icon, Image } from "semantic-ui-react";

import config from "../../../../config";

function ShopCard(props) {
  return (
    <Card color={config.color} fluid={props.fluid}>
      <Image src={props.image} />
      <Card.Content>
        <Card.Header as="h3" className="fancy">
          {props.name}
        </Card.Header>
        <Card.Description>{props.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Card.Description>
          <Icon name="phone" /> {props.phone}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Card.Description>
          <Icon name="envelope" /> {props.email}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Card.Description>
          {props.street}, {props.city}, {props.state} {props.zip}
        </Card.Description>
      </Card.Content>
      {props.linked && (
        <Card.Content extra>
          <Button
            as={Link}
            to={`/shop/${props.id}`}
            className="fancy"
            primary
            fluid
          >
            <Icon name="send" /> Visit this shop
          </Button>
        </Card.Content>
      )}
    </Card>
  );
}

ShopCard.propTypes = {
  id: PropTypes.string,
  color: PropTypes.string,
  image: PropTypes.string,
  description: PropTypes.string,
  phone: PropTypes.string,
  email: PropTypes.string,
  street: PropTypes.string,
  city: PropTypes.string,
  state: PropTypes.string,
  zip: PropTypes.string,
  linked: PropTypes.bool
};

export default ShopCard;
