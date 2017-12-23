import React from "react";
import { Button, Card, Icon } from "semantic-ui-react";

function Map(props) {
  return (
    <Card fluid>
      <Card.Content>Map</Card.Content>
      <Card.Content extra>
        <Button className="fancy" primary fluid>
          <Icon name="map pin" /> Find my location
        </Button>
      </Card.Content>
    </Card>
  );
}

Map.propTypes = {};

export default Map;
