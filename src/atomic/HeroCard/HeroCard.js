import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Card, Image } from "semantic-ui-react";
import styled from "styled-components";

import config from "../../config";

function HeroCard({ link, image, title }) {
  return (
    <Card as={Link} to={link}>
      <Image src={image} />
      <Card.Content>
        <TextAlign align="center">
          <Card.Header as="h3" className="fancy">
            {title}
          </Card.Header>
        </TextAlign>
      </Card.Content>
    </Card>
  );
}

HeroCard.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  link: PropTypes.string,
};

HeroCard.defaultProps = {
  image: config.placeholderImage,
  title: "",
  link: "/"
};

export default HeroCard;

// Styling

const TextAlign = styled.div`text-align: ${({ align }) => align};`;
