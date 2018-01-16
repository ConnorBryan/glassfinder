import React from "react";
import { Item, Divider, Button, Icon } from "semantic-ui-react";
import styled from "styled-components";
import { Parallax } from "react-parallax";

import Featured from "../components/Featured";
import ModelViewer from "../components/ModelViewer";
import API from "../services";
import {
  renderGenericTile,
  renderGenericItem,
  renderGenericCard
} from "./common";

import { PieceViewer } from "./Piece";

export function ShopHero() {
  const props = {
    image: "/shops.jpg",
    title: "Shops",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia ipsa consequatur, placeat dignissimos esse provident natus ratione magni id odit nemo quasi dicta quidem! Beatae nostrum consectetur explicabo unde esse.",
    flipped: false,
    buttonContent: "Explore shops",
    link: "/shops"
  };

  return <Featured {...props} />;
}

export function ShopViewer() {
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
    renderDetail: model => {
      const Styles = styled.div`
        .item.group {
          min-height: 60vh !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;

          .item {
            color: white !important;
            background: rgba(220, 220, 220, 0.75) !important;
            padding: 2rem 1rem 2rem 1rem !important;

            .image {
              cursor: pointer !important;
            }
          }

          .button {
            margin: 0 0.5rem 0 0.5rem !important;
            text-transform: uppercase !important;
            letter-spacing: 0.25rem !important;
          }
        }
      `;

      return (
        <Styles>
          <Parallax
            bgImage="https://wallpapercave.com/wp/AumsrZG.jpg"
            strength={200}
            basic
          >
            d
            <Item.Group>
              <Item>
                <Item.Content>
                  <Item.Header as="h2" content={model.name} />
                  <Item.Meta
                    content={`${model.street} ${model.city}, ${model.state} ${model.zip}`}
                  />
                  <Item.Description content={model.description} />
                  <Divider inverted section />
                  <Button.Group floated="right">
                    <Button secondary>
                      <Icon name="phone" /> {model.phone}
                    </Button>
                    <Button secondary>
                      <Icon name="envelope" /> {model.email}
                    </Button>
                    <Button primary>
                      <Icon name="map pin" /> Find on map
                    </Button>
                  </Button.Group>
                </Item.Content>
              </Item>
            </Item.Group>
          </Parallax>
          <PieceViewer />
        </Styles>
      );
    }
  };

  return <ModelViewer {...props} />;
}
