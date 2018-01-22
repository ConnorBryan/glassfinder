import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Responsive,
  Image,
  Divider,
  Button,
  Icon,
  Segment,
  Menu
} from "semantic-ui-react";
import styled from "styled-components";

import { LINK_TYPES, ICON_SET } from "../config";
import ScreenHeader from "../components/ScreenHeader";
import Featured from "../components/Featured";
import ModelViewer from "../components/ModelViewer";
import ShopMap from "../components/ShopMap";
import API from "../services";
import {
  renderGenericTile,
  renderGenericItem,
  renderGenericCard
} from "./common";

export function ShopHero({ verbiage }) {
  const props = {
    image: "/shops.jpg",
    title: verbiage.Home_shopFeatureHeader,
    description: verbiage.Home_shopFeatureDescription,
    flipped: false,
    buttonContent: verbiage.Home_shopFeatureButton,
    icon: ICON_SET[LINK_TYPES.SHOP],
    link: "/shops"
  };

  return <Featured {...props} />;
}

export class ShopViewer extends Component {
  shouldShowMap = () => {
    const { location: { pathname } } = window;

    return pathname.split("/").length === 2;
  };

  render() {
    const { verbiage } = this.props;

    const props = {
      exploreService: API.fetchShops,
      detailService: API.fetchShop,
      uri: "/shops",
      plural: "shops",
      singular: "shop",
      icon: "cart",
      renderTile: renderGenericTile,
      renderItem: renderGenericItem,
      renderCard: renderGenericCard,
      renderDetail: ({
        id,
        name,
        street,
        city,
        state,
        zip,
        image,
        description,
        phone,
        email,
        lat,
        lng
      }) => {
        const Styles = styled.div`
          .item {
            text-transform: uppercase !important;
            letter-spacing: 0.25rem !important;
          }

          .Shop-description {
            font-size: 1.2rem !important;
            line-height: 2.5rem !important;
          }
        `;

        const mapsUrl = `https://www.google.com/maps/@${lat},${lng},8z`;
        const address = `${street} ${city}, ${state} ${zip}`;
        const telephoneHref = `tel:${phone}`;
        const emailHref = `mailto:${email}`;
        const piecesLink = `/pieces?userId=${id}&type=SHOP`;

        return (
          <Styles>
            <Menu attached="top">
              <Menu.Item header content={name} />
              <Menu.Item
                as={Responsive}
                minWidth={Responsive.onlyTablet.minWidth}
                position="right"
              >
                <Icon name="globe" /> {address}
              </Menu.Item>
            </Menu>
            <Menu
              as={Responsive}
              maxWidth={Responsive.onlyMobile.maxWidth}
              attached="bottom"
            >
              <Menu.Item>
                <Icon name="globe" /> {address}
              </Menu.Item>
            </Menu>
            <Image src={image} />
            <Menu attached="bottom" widths={3} stackable>
              <Menu.Item as="a" href={telephoneHref}>
                <Icon name="phone" /> {phone}
              </Menu.Item>
              <Menu.Item as="a" href={emailHref}>
                <Icon name="envelope" /> {email}
              </Menu.Item>
              <Menu.Item as="a" href={mapsUrl} target="_blank">
                <Icon name="map pin" /> View on Google Maps
              </Menu.Item>
            </Menu>
            <Segment attached="bottom" className="Shop-description" clearing>
              {description}
              <Divider hidden />
              <Button as={Link} to={piecesLink} floated="right" primary>
                <Icon name="puzzle" /> View pieces
              </Button>
            </Segment>
          </Styles>
        );
      }
    };

    return (
      <section>
        <Container>
          <ScreenHeader
            icon={ICON_SET[LINK_TYPES.SHOP]}
            title={verbiage.ExploreShops_title}
            description={verbiage.ExploreShops_description}
          />
        </Container>
        <Divider hidden section />
        {this.shouldShowMap() && <ShopMap />}
        <Divider hidden section />
        <ModelViewer {...props} />
        <Divider hidden section />
      </section>
    );
  }
}
