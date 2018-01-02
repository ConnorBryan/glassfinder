import React from "react";
import { Item, Icon, Segment } from "semantic-ui-react";

import config from "../../config";
import withPageHeader from "../../components/withPageHeader";
import Update from "../../components/Update";

function Updates(props) {
  return (
    <Segment.Group>
      <Item.Group as={Segment} basic divided relaxed="very">
        <Item>
          <Item.Header as="h3" className="fancy">
            <Icon name="newspaper" /> All Updates
          </Item.Header>
        </Item>
        {config.updates.map(update => <Update key={update.key} {...update} />)}
      </Item.Group>
    </Segment.Group>
  );
}

export default withPageHeader(config.pageHeaders.updates, Updates);
