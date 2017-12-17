import React from "react";
import { Link } from "react-router-dom";
import { Header, Icon, Segment, Menu } from "semantic-ui-react";

import config from "../../../../config";
import withPageHeader from "../../../../atomic/withPageHeader";

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
      <Segment attached="top" color={config.color}>
        <MyAccountHeaderItem icon="book" title="Basics" />
      </Segment>
      <Segment attached="bottom">
        <Menu color={config.color} vertical fluid>
          <MyAccountItem
            to="/my-account/update-password"
            title="Update password"
          />
        </Menu>
      </Segment>
      <Segment attached="top" color={config.color}>
        <MyAccountHeaderItem icon="chain" title="Link your account" />
      </Segment>
      <Segment attached="bottom">
        <Menu color={config.color} vertical fluid>
          <MyAccountItem to="/my-account/become-a-shop" title="Become a shop" />
          <MyAccountItem
            to="/my-account/become-an-artist"
            title="Become an artist"
          />
          <MyAccountItem
            to="/my-account/become-a-brand"
            title="Become a brand"
          />
        </Menu>
      </Segment>
      <Segment attached="top" color={config.color}>
        <MyAccountHeaderItem
          icon={config.iconSet.shop}
          title="Manage your shop"
        />
      </Segment>
      <Segment attached="bottom">
        <Menu color={config.color} vertical fluid>
          <MyAccountItem
            to="/my-account/update-shop-information"
            title="Update shop information"
          />
          <MyAccountItem to="/my-account/upload-piece" title="Upload a piece" />
          <MyAccountItem
            to="/my-account/view-my-pieces"
            title="View my pieces"
          />
        </Menu>
      </Segment>
      <Segment attached="top" color={config.color}>
        <MyAccountHeaderItem
          icon={config.iconSet.artist}
          title="Manage your artist profile"
        />
      </Segment>
      <Segment attached="bottom">
        <Menu color={config.color} vertical fluid>
          <MyAccountItem
            to="/my-account/update-artist-information"
            title="Update artist information"
          />
          <MyAccountItem to="/my-account/upload-piece" title="Upload a piece" />
          <MyAccountItem
            to="/my-account/view-my-pieces"
            title="View my pieces"
          />
        </Menu>
      </Segment>
      <Segment attached="top" color={config.color}>
        <MyAccountHeaderItem
          icon={config.iconSet.brand}
          title="Manage your brand"
        />
      </Segment>
      <Segment attached="bottom">
        <Menu color={config.color} vertical fluid>
          <MyAccountItem
            to="/my-account/update-brand-information"
            title="Update brand information"
          />
          <MyAccountItem
            to="/my-account/upload-catalog"
            title="Upload a catalog"
          />
        </Menu>
      </Segment>
    </Segment.Group>
  );
}

export default withPageHeader(config.pageHeaders.myAccount, MyAccount);
