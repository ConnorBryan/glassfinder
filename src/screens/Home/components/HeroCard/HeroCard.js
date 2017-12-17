import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Card, Image, Icon, Message } from "semantic-ui-react";
import styled from "styled-components";

import config from "../../../../config";

function HeroCard(props) {
  return (
    <Card as={Link} color={config.color} to={props.link} raised>
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
      <Card.Content extra>
        <Message color={config.color}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam quidem
          beatae voluptatem eum magni, id asperiores, tenetur voluptate
          voluptatibus, distinctio quasi illum. Maxime optio impedit voluptas
          labore nihil animi rerum!
        </Message>
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
const BlackText = styled.span`color: rgba(0, 0, 0, 0.85) !important;`;
