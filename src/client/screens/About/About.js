import React, { Component } from "react";
import { Button, Container, Item, Segment } from "semantic-ui-react";
import styled from "styled-components";

import * as config from "../../../config";
import { genericSetItems } from "../../../util";
import API from "../../services";
import { fancy, slightlyBiggerText } from "../../styles/snippets";
import ScreenHeader from "../../components/ScreenHeader";
import AboutThing from "./components/AboutThing";

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
      <Item.Image circular size="medium" src={image} />
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
        <Container>
          <ScreenHeader
            icon="question circle"
            title={verbiage.About_title}
            description={verbiage.About_description}
          />
          {items.map(about => <AboutThing key={about.name} {...about} />)}
        </Container>
      </Styles>
    );
  }
}

export default About;
