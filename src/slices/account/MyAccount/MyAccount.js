import React from "react";
import { Link } from "react-router-dom";
import { Accordion, Header, Icon, Segment, Menu } from "semantic-ui-react";

import config from "../../../config";
import withPageHeader from "../../../atomic/withPageHeader";

function MyAccountHeaderItem(props) {
  return (
    <Header as="h3" className="fancy">
      <Icon name={props.icon} /> {props.title}
    </Header>
  );
}

function MyAccountItem(props) {
  return (
    <Menu.Item as={Link} to={props.to}>
      <Icon name="chevron right" /> {props.title}
    </Menu.Item>
  );
}

function MyAccount(props) {
  return (
    <Segment.Group>
      
      <Segment attached="top" color="blue">
        <MyAccountHeaderItem icon="book" title="Basics" />
      </Segment>
      <Segment attached="bottom">
        <Menu color="blue" vertical fluid>
          <MyAccountItem to="/update-password" title="Update password" />
        </Menu>
      </Segment>

      <Segment attached="top" color="blue">
        <MyAccountHeaderItem icon="chain" title="Link your account" />
      </Segment>
      <Segment attached="bottom">
        <Menu color="blue" vertical fluid>
          <MyAccountItem to="/" title="Become a shop" />
          <MyAccountItem to="/" title="Become an artist" />
          <MyAccountItem to="/" title="Become a brand" />
        </Menu>
      </Segment>

      <Segment attached="top" color="blue">
        <MyAccountHeaderItem icon="shop" title="Manage your shop" />
      </Segment>
      <Segment attached="bottom">
        <Menu color="blue" vertical fluid>
          <MyAccountItem to="/" title="Update shop information" />
          <MyAccountItem to="/" title="Upload a piece" />
          <MyAccountItem to="/" title="View my pieces" />
        </Menu>
      </Segment>

    </Segment.Group>
  );
}

export default withPageHeader(config.pageHeaders.myAccount, MyAccount);
