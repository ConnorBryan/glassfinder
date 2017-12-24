import React from "react";
import PropTypes from "prop-types";
import { Card, Icon, Image } from "semantic-ui-react";

import config from "../../../../config";

function ArtistCard(props) {
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
          <Icon name="map pin" /> {props.from}
        </Card.Description>
      </Card.Content>
    </Card>
  );
}

ArtistCard.propTypes = {
  fluid: PropTypes.bool,
  image: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  from: PropTypes.string
};

export default ArtistCard;
