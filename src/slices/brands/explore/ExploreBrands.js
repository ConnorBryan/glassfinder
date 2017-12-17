import React from "react";
import { Button, Card, Icon, Image, Segment } from "semantic-ui-react";

import config from "../../../config";
import withPageHeader from "../../../providers/withPageHeader";

function BrandCard(props) {
  return (
    <Card color={config.color}>
      <Image src={props.image} />
      <Card.Content>
        <Card.Header as="h3" className="fancy">
          {props.name}
        </Card.Header>
        <Card.Description>{props.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Card.Description>
          <Icon name="map pin" /> From {props.from}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button className="fancy" fluid>
          <Icon name="globe" /> Visit this brand
        </Button>
      </Card.Content>
      <Card.Content extra>
        <Button className="fancy" primary fluid>
          <Icon name="download" /> Download catalog
        </Button>
      </Card.Content>
    </Card>
  );
}

function ExploreBrands(props) {
  return (
    <Segment.Group>
      <Segment>
        <Card.Group stackable itemsPerRow={3}>
          {config.brands.map(brand => <BrandCard key={brand.key} {...brand} />)}
        </Card.Group>
      </Segment>
    </Segment.Group>
  );
}

export default withPageHeader(config.pageHeaders.exploreBrands, ExploreBrands);
