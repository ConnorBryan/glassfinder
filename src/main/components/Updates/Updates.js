import React, { Component } from "react";
import { Container, Segment, Divider, Item } from "semantic-ui-react";
import styled from "styled-components";
import moment from "moment";

import API from "../../services";
import { updateCache, genericSetItems } from "../../util";
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

function UpdateItem({ verbiage, image, title, createdAt, content, author }) {
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
      </Item.Content>
    </Item>
  );
}

class Updates extends Component {
  state = {
    items: []
  };

  componentDidMount() {
    this.setItems();
  }

  setItems = async () => {
    const setItems = genericSetItems.bind(this);

    await setItems("updates", API.fetchUpdateItems);

    this.sortItems();
  };

  sortItems = () => {
    const { items } = this.state;

    const sorted = items.sort((a, b) => {
      const prevTime = new Date(a.createdAt).getTime();
      const nextTime = new Date(b.createdAt).getTime();

      return nextTime > prevTime ? -1 : 1;
    });

    updateCache("updates", JSON.stringify(sorted));

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
