import React, { Component } from "react";
import { Container, Segment, Divider, Item, Button } from "semantic-ui-react";
import styled from "styled-components";
import moment from "moment";

import * as config from "../../../config";
import { CacheProvider, genericSetItems } from "../../../util";
import API from "../../services";
import { fancy, slightlyBiggerText } from "../../styles/snippets";
import ScreenHeader from "../ScreenHeader";

const Styles = styled.div`
  .description {
    ${slightlyBiggerText};
  }
  .header {
    ${fancy};
  }
`;

export function UpdateItem({
  verbiage,
  image,
  title,
  createdAt,
  content,
  author,
  admin,
  edit,
  remove
}) {
  const date = moment(new Date(createdAt)).format("MMMM Do YYYY, h:mm:ss A");

  return (
    <Item>
      <Item.Image circular size="small" src={image} />
      <Item.Content>
        <Item.Header size="medium">{title}</Item.Header>
        <Item.Meta>{date}</Item.Meta>
        <Item.Description
          dangerouslySetInnerHTML={{
            __html: content
          }}
        />
        <Item.Extra>
          {verbiage.Updates_postedBy} {author}
        </Item.Extra>
        {admin && (
          <Item.Extra>
            <Button icon="pencil" content="Edit" primary onClick={edit} />
            <Button icon="trash" content="Remove" negative onClick={remove} />
          </Item.Extra>
        )}
      </Item.Content>
    </Item>
  );
}

class Updates extends Component {
  state = {
    items: []
  };

  setItems = genericSetItems.bind(
    this,
    config.UPDATE_CACHE_KEY,
    config.UPDATE_CACHE_EXPIRATION,
    API.fetchUpdateItems,
    "updates"
  );

  componentDidMount() {
    (async () => {
      await this.setItems();
      this.sortItems();
    })();
  }

  sortItems = () => {
    const { items } = this.state;

    const sorted = items.sort((a, b) => {
      const prevTime = new Date(a.createdAt).getTime();
      const nextTime = new Date(b.createdAt).getTime();

      return nextTime > prevTime ? -1 : 1;
    });

    CacheProvider.update(
      config.UPDATE_CACHE_KEY,
      sorted,
      config.UPDATE_CACHE_EXPIRATION
    );

    this.setState({ items: sorted });
  };

  render() {
    const { items } = this.state;
    const { verbiage } = this.props;

    return (
      <Styles>
        <Container as={Segment}>
          <ScreenHeader
            icon="newspaper"
            title={verbiage.Updates_title}
            description={verbiage.Updates_description}
          />
          <Divider hidden />
          <Segment>
            <Item.Group as={Segment} relaxed="very" basic divided>
              {items.map(update => (
                <UpdateItem
                  key={update.title}
                  verbiage={verbiage}
                  {...update}
                />
              ))}
            </Item.Group>
          </Segment>
        </Container>
      </Styles>
    );
  }
}

export default Updates;
