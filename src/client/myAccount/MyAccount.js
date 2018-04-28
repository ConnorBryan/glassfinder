import React from "react";
import { Link, Redirect } from "react-router-dom";
import { Container, Header, Icon, Segment, Menu } from "semantic-ui-react";
import Aux from "react-aux";
import styled from "styled-components";

import * as config from "../../config";
import ScreenHeader from "../components/ScreenHeader";

const Styles = styled.div`
  .item,
  .header {
    text-transform: uppercase !important;
    letter-spacing: 0.25rem !important;
  }

  .segment {
    border: 1px solid #555 !important;
  }
`;

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

function MyAccountBasics({ verbiage }) {
  return (
    <Aux>
      <Segment inverted attached="top">
        <MyAccountHeaderItem
          icon="book"
          title={verbiage.MyAccount_basicsTitle}
        />
      </Segment>
      <Segment inverted attached="bottom">
        <Menu inverted vertical fluid>
          <MyAccountItem
            to="/my-account/update-password"
            title={verbiage.MyAccount_updatePassword}
          />
        </Menu>
      </Segment>
    </Aux>
  );
}

function MyAccountUnlinked({ verbiage }) {
  return (
    <Aux>
      <Segment inverted attached="top">
        <MyAccountHeaderItem
          icon="chain"
          title={verbiage.MyAccount_linkAccountTitle}
        />
      </Segment>
      <Segment inverted attached="bottom">
        <Menu inverted vertical fluid>
          <MyAccountItem
            to="/my-account/become-a-shop"
            title={verbiage.MyAccount_becomeAShop}
          />
          <MyAccountItem
            to="/my-account/become-an-artist"
            title={verbiage.MyAccount_becomeAnArtist}
          />
          <MyAccountItem
            to="/my-account/become-a-brand"
            title={verbiage.MyAccount_becomeABrand}
          />
        </Menu>
      </Segment>
    </Aux>
  );
}

function MyAccountShopMenu({ verbiage }) {
  return (
    <Aux>
      <Segment inverted attached="top">
        <MyAccountHeaderItem
          icon={config.ICON_SET.SHOP}
          title={verbiage.MyAccount_shopOptionsTitle}
        />
      </Segment>
      <Segment inverted attached="bottom">
        <Menu inverted vertical fluid>
          <MyAccountItem
            to="/my-account/update-shop-information"
            title={verbiage.MyAccount_updateShopInformation}
          />
          <MyAccountItem to="/my-account/upload-piece" title="Upload a piece" />
          <MyAccountItem
            to="/my-account/view-my-pieces"
            title={verbiage.MyAccount_viewMyPieces}
          />
          <MyAccountItem
            to="/my-account/update-my-associations"
            title="Update my brand associations"
          />
        </Menu>
      </Segment>
    </Aux>
  );
}

function MyAccountArtistMenu({ verbiage }) {
  return (
    <Aux>
      <Segment inverted attached="top">
        <MyAccountHeaderItem
          icon={config.ICON_SET.ARTIST}
          title={verbiage.MyAccount_artistOptionsTitle}
        />
      </Segment>
      <Segment inverted attached="bottom">
        <Menu inverted vertical fluid>
          <MyAccountItem
            to="/my-account/update-artist-information"
            title={verbiage.MyAccount_updateArtistInformation}
          />
          <MyAccountItem to="/my-account/upload-piece" title="Upload a piece" />
          <MyAccountItem
            to="/my-account/view-my-pieces"
            title={verbiage.MyAccount_viewMyPieces}
          />
        </Menu>
      </Segment>
    </Aux>
  );
}

function MyAccountBrandMenu({ verbiage }) {
  return (
    <Aux>
      <Segment inverted attached="top">
        <MyAccountHeaderItem
          icon={config.ICON_SET.BRAND}
          title={verbiage.MyAccount_brandOptionsTitle}
        />
      </Segment>
      <Segment inverted attached="bottom">
        <Menu inverted vertical fluid>
          <MyAccountItem
            to="/my-account/update-brand-information"
            title={verbiage.MyAccount_updateBrandInformation}
          />
          <MyAccountItem
            to="/my-account/upload-catalog"
            title={verbiage.MyAccount_uploadCatalog}
          />
        </Menu>
      </Segment>
    </Aux>
  );
}

function MyAccount({ verbiage, account }) {
  if (!account) return <Redirect to="/sign-in" />;

  const { linked, type } = account;
  const linkedAsShop = type === config.LINK_TYPES.SHOP;
  const linkedAsArtist = type === config.LINK_TYPES.ARTIST;
  const linkedAsBrand = type === config.LINK_TYPES.BRAND;
  const waitingOnLinkConfirmation =
    linked && !(linkedAsShop || linkedAsArtist || linkedAsBrand);

  return (
    <Styles>
      <Container>
        <ScreenHeader
          icon="settings"
          title={verbiage.MyAccount_title}
          description={verbiage.MyAccount_description}
        />
        <Segment.Group>
          <MyAccountBasics verbiage={verbiage} />
          {!linked && <MyAccountUnlinked verbiage={verbiage} />}
          {linkedAsShop && <MyAccountShopMenu verbiage={verbiage} />}
          {linkedAsArtist && <MyAccountArtistMenu verbiage={verbiage} />}
          {linkedAsBrand && <MyAccountBrandMenu verbiage={verbiage} />}
          {waitingOnLinkConfirmation && (
            <Segment inverted>
              <Icon name="chain" />
              Your link request is being processed. Please allow 24-48 hours to
              be approved.
            </Segment>
          )}
        </Segment.Group>
      </Container>
    </Styles>
  );
}

export default MyAccount;
