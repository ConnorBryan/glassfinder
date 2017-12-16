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

function HeroCard({ image, title }) {
  return (
    <Card>
      <Image src={image} />
      <Card.Content>
        <TextAlign align="center">
          <Card.Header>{title}</Card.Header>
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
        <Item.Header size="medium">{props.header}</Item.Header>
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
      <Message>
        <Message.Content>
          <Message.Header>{config.welcomeMessage.header}</Message.Header>
          <Message.List>
            {config.welcomeMessage.content.map((content, index) => (
              <Message.Item key={index}>{content}</Message.Item>
            ))}
          </Message.List>
        </Message.Content>
      </Message>
      <Card.Group itemsPerRow={3}>
        <HeroCard image={config.placeholderImage} title="Example" />
        <HeroCard image={config.placeholderImage} title="Example" />
        <HeroCard image={config.placeholderImage} title="Example" />
      </Card.Group>
      <Item.Group as={Segment} divided relaxed="very">
        <Item className="fancy" header="Updates" />
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

export default Home;

// Styling

const TextAlign = styled.div`text-align: ${({ align }) => align};`;
