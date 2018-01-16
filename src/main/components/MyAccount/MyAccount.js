import React from "react";
import { Link, Redirect } from "react-router-dom";
import { Container, Header, Icon, Segment, Menu } from "semantic-ui-react";
import Aux from "react-aux";

import { LINK_TYPES, ICON_SET } from "../../config";

function MyAccountHeaderItem({ icon, title }) {
  return (
    <Header as="h3" className="fancy">
      <Icon name={icon} /> {title}
    </Header>
  );
}

function MyAccountItem({ to, title }) {
  return (
    <Menu.Item as={Link} to={to}>
      <Icon name="chevron right" /> {title}
    </Menu.Item>
  );
}

function MyAccountBasics() {
  return (
    <Aux>
      <Segment attached="top" color="blue">
        <MyAccountHeaderItem icon="book" title="Basics" />
      </Segment>
      <Segment attached="bottom">
        <Menu color="blue" vertical fluid>
          <MyAccountItem
            to="/my-account/update-password"
            title="Update password"
          />
        </Menu>
      </Segment>
    </Aux>
  );
}

function MyAccountUnlinked() {
  return (
    <Aux>
      <Segment attached="top" color="blue">
        <MyAccountHeaderItem icon="chain" title="Link your account" />
      </Segment>
      <Segment attached="bottom">
        <Menu color="blue" vertical fluid>
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
    </Aux>
  );
}

function MyAccountShopMenu() {
  return (
    <Aux>
      <Segment attached="top" color="blue">
        <MyAccountHeaderItem icon={ICON_SET.SHOP} title="Manage your shop" />
      </Segment>
      <Segment attached="bottom">
        <Menu color="blue" vertical fluid>
          <MyAccountItem
            to="/my-account/update-shop-information"
            title="Update shop information"
          />
          <MyAccountItem
            to="/my-account/upload-image"
            title="Upload an image"
          />
          <MyAccountItem to="/my-account/upload-piece" title="Upload a piece" />
          <MyAccountItem
            to="/my-account/view-my-pieces"
            title="View my pieces"
          />
        </Menu>
      </Segment>
    </Aux>
  );
}

function MyAccountArtistMenu() {
  return (
    <Aux>
      <Segment attached="top" color="blue">
        <MyAccountHeaderItem
          icon={ICON_SET.ARTIST}
          title="Manage your artist profile"
        />
      </Segment>
      <Segment attached="bottom">
        <Menu color="blue" vertical fluid>
          <MyAccountItem
            to="/my-account/update-artist-information"
            title="Update artist information"
          />
          <MyAccountItem
            to="/my-account/upload-image"
            title="Upload an image"
          />
          <MyAccountItem to="/my-account/upload-piece" title="Upload a piece" />
          <MyAccountItem
            to="/my-account/view-my-pieces"
            title="View my pieces"
          />
        </Menu>
      </Segment>
    </Aux>
  );
}

function MyAccountBrandMenu() {
  return (
    <Aux>
      <Segment attached="top" color="blue">
        <MyAccountHeaderItem icon={ICON_SET.BRAND} title="Manage your brand" />
      </Segment>
      <Segment attached="bottom">
        <Menu color="blue" vertical fluid>
          <MyAccountItem
            to="/my-account/update-brand-information"
            title="Update brand information"
          />
          <MyAccountItem
            to="/my-account/upload-image"
            title="Upload an image"
          />
          <MyAccountItem
            to="/my-account/upload-catalog"
            title="Upload a catalog"
          />
        </Menu>
      </Segment>
    </Aux>
  );
}

function MyAccount({ account }) {
  if (!account) return <Redirect to="/sign-in" />;

  const { linked, type } = account;
  const linkedAsShop = type === LINK_TYPES.SHOP;
  const linkedAsArtist = type === LINK_TYPES.ARTIST;
  const linkedAsBrand = type === LINK_TYPES.BRAND;

  return (
    <Container>
      <Segment.Group>
        <MyAccountBasics />
        {!linked && <MyAccountUnlinked />}
        {linkedAsShop && <MyAccountShopMenu />}
        {linkedAsArtist && <MyAccountArtistMenu />}
        {linkedAsBrand && <MyAccountBrandMenu />}
      </Segment.Group>
    </Container>
  );
}

export default MyAccount;
