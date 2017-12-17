import React from "react";
import { Item, Icon, Segment } from "semantic-ui-react";

import config from "../../config";
import withPageHeader from "../../atomic/withPageHeader";
import Update from "../../atomic/Update";

function Updates(props) {
  return (
    <Item.Group as={Segment} divided relaxed="very" attached="top">
      <Item>
        <Item.Header as="h3" className="fancy">
          <Icon name="newspaper" /> All Updates
        </Item.Header>
      </Item>
      {config.updates.map(update => <Update key={update.key} {...update} />)}
    </Item.Group>
  );
}

export default withPageHeader(config.pageHeaders.updates, Updates);
