import React, { Component } from "react";
import { Button, Container, Divider, Item, Segment } from "semantic-ui-react";
import styled from "styled-components";

import * as config from "../../../config";
import { genericSetItems } from "../../../util";
import API from "../../services";
import { fancy, slightlyBiggerText } from "../../styles/snippets";
import ScreenHeader from "../ScreenHeader";

const Styles = styled.div`
  .header {
    ${fancy};
  }

  .description {
    ${slightlyBiggerText};
  }
`;

export function AboutItem({
  admin,
  edit,
  remove,
  image,
  name,
  title,
  description
}) {
  return (
    <Item>
      <Item.Image circular size="small" src={image} />
      <Item.Content>
        <Item.Header as="h3">{name}</Item.Header>
        <Item.Description>
          <em>{title}</em>
        </Item.Description>
        <Item.Description>{description}</Item.Description>
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

class About extends Component {
  state = {
    items: []
  };

  setItems = genericSetItems.bind(
    this,
    config.ABOUT_CACHE_KEY,
    config.ABOUT_CACHE_EXPIRATION,
    API.fetchAboutItems,
    "about"
  );

  componentDidMount() {
    this.setItems();
  }

  render() {
    const { verbiage } = this.props;
    const { items } = this.state;

    return (
      <Styles>
        <Container as={Segment}>
          <ScreenHeader
            icon="question circle"
            title={verbiage.About_title}
            description={verbiage.About_description}
          />
          <Divider hidden />
          <Segment>
            <Item.Group divided relaxed="very">
              {items.map(about => <AboutItem key={about.name} {...about} />)}
            </Item.Group>
          </Segment>
        </Container>
      </Styles>
    );
  }
}

export default About;
