import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { Header, Icon, Segment, Menu } from "semantic-ui-react";
import Aux from "react-aux";

import config from "../../../../config";
import withPageHeader from "../../../../components/withPageHeader";

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
  const { account, type, linked } = props;

  const linkedAsShop = type === config.linkTypes.SHOP;
  const linkedAsArtist = type === config.linkTypes.ARTIST;
  const linkedAsBrand = type === config.linkTypes.BRAND;

  return account ? (
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

      {!linked && (
        <Aux>
          <Segment attached="top" color={config.color}>
            <MyAccountHeaderItem icon="chain" title="Link your account" />
          </Segment>
          <Segment attached="bottom">
            <Menu color={config.color} vertical fluid>
              <MyAccountItem
                to="/my-account/become-a-shop"
                title="Become a shop"
              />
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
      )}

      {linkedAsShop && (
        <Aux>
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
              <MyAccountItem
                to="/my-account/upload-piece"
                title="Upload a piece"
              />
              <MyAccountItem
                to="/my-account/view-my-pieces"
                title="View my pieces"
              />
            </Menu>
          </Segment>
        </Aux>
      )}

      {linkedAsArtist && (
        <Aux>
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
              <MyAccountItem
                to="/my-account/upload-piece"
                title="Upload a piece"
              />
              <MyAccountItem
                to="/my-account/view-my-pieces"
                title="View my pieces"
              />
            </Menu>
          </Segment>
        </Aux>
      )}
      {linkedAsBrand && (
        <Aux>
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
        </Aux>
      )}
    </Segment.Group>
  ) : (
    <Redirect to="/sign-in" />
  );
}

export default connect(
  state => ({
    account: state.account,
    linked: state.account ? state.account.linked : null,
    type: state.account ? state.account.type : null
  }),
  null
)(withPageHeader(config.pageHeaders.myAccount, MyAccount));
