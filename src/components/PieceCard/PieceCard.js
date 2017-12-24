import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Button, Card, Icon, Image } from "semantic-ui-react";

import config from "../../config";

function PieceCard(props) {
  return (
    <Card fluid={props.fluid}>
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
      {props.linked && (
        <Card.Content extra>
          <Button as={Link} to="/piece/1" className="fancy" fluid>
            <Icon name="picture" /> View more pics
          </Button>
        </Card.Content>
      )}
      {props.artistLinked && (
        <Card.Content extra>
          <Button as={Link} to="/artist/1" className="fancy" fluid>
            <Icon name={config.iconSet.artist} /> View artist
          </Button>
        </Card.Content>
      )}
      {props.shopLinked && (
        <Card.Content extra>
          <Button as={Link} to="/shop/1" className="fancy" fluid>
            <Icon name={config.iconSet.shop} /> View shop
          </Button>
        </Card.Content>
      )}
      {props.purchaseLinked && (
        <Card.Content extra>
          <Button as={Link} to="/purchase/1" className="fancy" primary fluid>
            <Icon name="download" /> Purchase
          </Button>
        </Card.Content>
      )}
    </Card>
  );
}

PieceCard.propTypes = {
  fluid: PropTypes.bool,
  image: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  maker: PropTypes.string,
  price: PropTypes.number,
  location: PropTypes.string,
  linked: PropTypes.bool,
  artistLinked: PropTypes.bool,
  shopLinked: PropTypes.bool,
  purchaseLinked: PropTypes.bool
};

export default PieceCard;
