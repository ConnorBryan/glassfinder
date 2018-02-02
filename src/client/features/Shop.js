import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Grid,
  Responsive,
  Image,
  Divider,
  Button,
  Icon,
  Segment,
  Menu,
  Loader
} from "semantic-ui-react";
import styled from "styled-components";
import accounting from "accounting";

import * as config from "../../config";
import { fancy, slightlyBiggerText } from "../styles/snippets";
import ScreenHeader from "../components/ScreenHeader";
import Thing from "../components/Thing";
import ModelExplorer from "../components/ModelExplorer";
import ModelDetail from "../components/ModelDetail";
import ModelViewer from "../components/ModelViewer";
import ShopMap from "../components/ShopMap";
import API from "../services";
import {
  genericSorts,
  renderGenericTile,
  renderGenericItem,
  renderGenericCard
} from "./common";
import { PieceThing } from "./Piece";

const Styles = styled.div`
  .ModelDetail-main {
    padding: 0 !important;
  }
`;

function ShopThing(props) {
  const {
    id,
    image,
    name: title,
    email,
    description: content,
    phone,
    street,
    city,
    state,
    zip
  } = props;
  const top = `${street}, ${city}, ${state} ${zip}`;
  const actions = [
    {
      icon: "phone",
      content: "Call",
      as: "a",
      href: `tel://${phone}`
    },
    {
      icon: "envelope",
      content: "Email",
      href: `mailto://${email}`
    },
    {
      icon: config.ICON_SET[config.LINK_TYPES.SHOP],
      content: "Visit",
      as: Link,
      to: `/shops/${id}`
    }
  ];

  return <Thing {...{ image, title, top, content, actions }} />;
}

function ShopDetail({ id }) {
  const props = {
    id,
    fetchModel: API.fetchShop,
    render: model => <ShopThing {...model} />
  };

  return <ModelDetail {...props} />;
}

export function ShopExplorer({ history }) {
  const props = {
    icon: config.ICON_SET[config.LINK_TYPES.SHOP],
    title: `Explore ${config.LINK_TYPES_TO_RESOURCES[config.LINK_TYPES.SHOP]}`,
    detailTitle: `Available Pieces`,
    resource: config.LINK_TYPES_TO_RESOURCES[config.LINK_TYPES.SHOP],
    fetchModels: API.fetchShops,
    fetchDetailModels: API.fetchShopPieces,
    renderDetail: id => <ShopDetail {...{ id }} />,
    cacheKey: config.SHOP_CACHE_KEY,
    cacheExpiration: config.SHOP_CACHE_EXPIRATION,
    renderItems: (models = []) =>
      models.map((model, index) => <ShopThing key={index} {...model} />),
    renderDetailItems: (models = []) =>
      models.map((model, index) => <PieceThing key={index} {...model} />)
  };

  return <ModelExplorer {...props} />;
}
