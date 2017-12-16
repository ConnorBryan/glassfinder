import React from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Container,
  Card,
  Image,
  Item,
  Icon,
  Segment,
  Message
} from "semantic-ui-react";
import styled from "styled-components";

import config from "../../config";
import withPageHeader from "../../atomic/withPageHeader";

function HeroCard({ image, title }) {
  return (
    <Card>
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
  title: PropTypes.string
};

HeroCard.defaultProps = {
  image: config.placeholderImage,
  title: ""
};

function Update(props) {
  return (
    <Item>
      <Item.Image circular size="small" src={props.image} />
      <Item.Content>
        <Item.Header className="fancy" size="medium">
          {props.header}
        </Item.Header>
        <Item.Meta>{props.meta}</Item.Meta>
        <Item.Description>{props.description}</Item.Description>
        <TextAlign align="right">
          <Item.Extra>Posted by {props.author}</Item.Extra>
        </TextAlign>
      </Item.Content>
    </Item>
  );
}

Update.propTypes = {
  image: PropTypes.string,
  header: PropTypes.string,
  meta: PropTypes.string,
  description: PropTypes.description,
  author: PropTypes.author
};

function Home(props) {
  return (
    <Container>
      <Card.Group stackable itemsPerRow={3}>
        <HeroCard image={config.placeholderImage} title="Shops" />
        <HeroCard image={config.placeholderImage} title="Pieces" />
        <HeroCard image={config.placeholderImage} title="Brands" />
      </Card.Group>
      <Item.Group as={Segment} divided relaxed="very">
        <Item>
          <Item.Header as="h3" className="fancy">
            <Icon name="newspaper" /> Updates
          </Item.Header>
        </Item>
        {config.updates.map(update => (
          <Update
            key={update.key}
            image={update.image}
            header={update.header}
            meta={update.meta}
            description={update.description}
            author={update.author}
          />
        ))}
      </Item.Group>
    </Container>
  );
}

Home.propTypes = {};

export default withPageHeader(config.pageHeaders.home, Home);

// Styling

const TextAlign = styled.div`text-align: ${({ align }) => align};`;
