import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  Item,
  Icon,
  Message,
  Segment,
  Header
} from "semantic-ui-react";
import { Parallax } from "react-parallax";
import styled from "styled-components";

import config from "../../config";
import Update from "../../components/Update";
import HeroCard from "../../components/HeroCard";
import withPageHeader from "../../components/withPageHeader";

function Home(props) {
  return (
    <Segment basic>
      <SplashParallax bgImage={config.splashImage} strength={400} basic>
        <Header
          as={VisibleH1}
          content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti eum, labore quidem autem aperiam qui dolor a, error, reprehenderit natus sapiente repellendus libero ipsa, recusandae et rerum amet! Ea, officia?"
        />
      </SplashParallax>
      <Card.Group as={GimmeSomeSpace} stackable itemsPerRow={3}>
        {config.heroes.map(hero => <HeroCard key={hero.key} {...hero} />)}
      </Card.Group>
      <Item.Group as={Segment} divided relaxed="very" attached="top">
        <Item>
          <Item.Header as="h3" className="fancy">
            <Icon name="newspaper" /> Latest Updates
          </Item.Header>
        </Item>
        {config.updates.map(
          (update, index) =>
            index < 4 && <Update key={update.key} {...update} />
        )}
      </Item.Group>
      <Message attached="bottom">
        <Button.Group fluid>
          <Button as={Link} className="fancy" to="/updates" primary>
            View all <Icon name="chevron right" />
          </Button>
        </Button.Group>
      </Message>
    </Segment>
  );
}

export default withPageHeader(config.pageHeaders.home, Home);

/* Styling */
const SplashParallax = styled(Parallax)`
  min-height: 30rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const GimmeSomeSpace = styled.div`margin-top: 0.5rem !important;`;

const VisibleH1 = styled.h1`
  background: rgba(255, 255, 255, 0.7);
  padding: 1rem !important;
`;
