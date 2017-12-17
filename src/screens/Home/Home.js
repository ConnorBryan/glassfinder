import React from "react";
import { Container, Card, Item, Icon, Segment } from "semantic-ui-react";

import config from "../../config";
import withPageHeader from "../../atomic/withPageHeader";
import HeroCard from "../../atomic/HeroCard";
import Update from "../../atomic/Update";

function Home(props) {
  return (
    <Container>
      <Card.Group stackable itemsPerRow={3}>
        <HeroCard
          link="/explore-shops"
          image={config.placeholderImage}
          title="Shops"
        />
        <HeroCard
          link="/explore-pieces"
          image={config.placeholderImage}
          title="Pieces"
        />
        <HeroCard
          link="/explore-brands"
          image={config.placeholderImage}
          title="Brands"
        />
      </Card.Group>
      <Item.Group as={Segment} divided relaxed="very">
        <Item>
          <Item.Header as="h3" className="fancy">
            <Icon name="newspaper" /> Updates
          </Item.Header>
        </Item>
        {config.updates.map(update => <Update key={update.key} {...update} />)}
      </Item.Group>
    </Container>
  );
}

export default withPageHeader(config.pageHeaders.home, Home);
