import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Card, Image, Icon } from "semantic-ui-react";
import styled from "styled-components";

import config from "../../config";

function HeroCard(props) {
  return (
    <Card as={Link} to={props.link}>
      <Image src={props.image} />
      <Card.Content>
        <TextAlign align="center">
          <Card.Header as="h3" className="fancy">
            <BlackText>
              <Icon name={props.icon} /> {props.title}
            </BlackText>
          </Card.Header>
        </TextAlign>
      </Card.Content>
    </Card>
  );
}

HeroCard.propTypes = {
  icon: PropTypes.string,
  image: PropTypes.string,
  title: PropTypes.string,
  link: PropTypes.string
};

HeroCard.defaultProps = {
  icon: "",
  image: config.placeholderImage,
  title: "",
  link: "/"
};

export default HeroCard;

// Styling

const TextAlign = styled.div`text-align: ${({ align }) => align};`;
const BlackText = styled.span`color: rgba(0,0,0,.85) !important;`;
