import React from "react";
import { Card, Segment } from "semantic-ui-react";

import config from "../../../config";
import withPageHeader from "../../../components/withPageHeader";
import Map from "../components/Map";
import ShopCard from "../components/ShopCard";

function ExploreShops(props) {
  return (
    <Segment.Group>
      <Segment attached="top">
        <Map />
      </Segment>
      <Segment attached="bottom">
        <Card.Group stackable itemsPerRow={3}>
          {config.shops.map(shop => (
            <ShopCard key={shop.key} mapLinked linked {...shop} />
          ))}
        </Card.Group>
      </Segment>
    </Segment.Group>
  );
}

ExploreShops.propTypes = {};

export default withPageHeader(config.pageHeaders.exploreShops, ExploreShops);
