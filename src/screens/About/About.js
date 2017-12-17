import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Accordion,
  Button,
  Card,
  Header,
  Icon,
  Image,
  Item,
  Segment
} from "semantic-ui-react";

import config from "../../config";
import withPageHeader from "../../atomic/withPageHeader";

function AboutItem(props) {
  return (
    <Item>
      <Item.Image circular size="small" src={props.image} />
      <Item.Content>
        <Item.Header as="h3" className="fancy">
          {props.name}
        </Item.Header>
        <Item.Description>
          <em>{props.role}</em>
        </Item.Description>
        <Item.Description>{props.blurb}</Item.Description>
      </Item.Content>
    </Item>
  );
}

function About(props) {
  return (
    <Item.Group as={Segment} divided relaxed="very">
      {config.about.map(about => (
        <AboutItem key={about.key} {...about} />
      ))}
    </Item.Group>
  );
}

About.propTypes = {};

export default withPageHeader(config.pageHeaders.about, About);
