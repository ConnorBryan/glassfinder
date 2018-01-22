import React from "react";
import { Container, Divider } from "semantic-ui-react";

import { LINK_TYPES, ICON_SET } from "../config";
import ScreenHeader from "../components/ScreenHeader";
import Featured from "../components/Featured";
import ModelViewer from "../components/ModelViewer";
import API from "../services";
import {
  renderGenericTile,
  renderGenericItem,
  renderGenericCard
} from "./common";

export function BrandHero({ verbiage }) {
  const props = {
    image: "/brands.jpg",
    title: verbiage.Home_brandFeatureHeader,
    description: verbiage.Home_brandFeatureDescription,
    flipped: false,
    buttonContent: verbiage.Home_brandFeatureButton,
    icon: ICON_SET[LINK_TYPES.BRAND],
    link: "/brands"
  };

  return <Featured {...props} />;
}

export function BrandViewer({ verbiage }) {
  const props = {
    exploreService: API.fetchBrands,
    detailService: API.fetchBrand,
    uri: "/brands",
    plural: "brands",
    singular: "brand",
    icon: "building",
    renderTile: renderGenericTile,
    renderItem: renderGenericItem,
    renderCard: renderGenericCard,
    renderDetail: brand => {
      return <p>{brand.name}</p>;
    }
  };

  return (
    <section>
      <Container>
        <ScreenHeader
          icon={ICON_SET[LINK_TYPES.BRAND]}
          title={verbiage.ExploreBrands_title}
          description={verbiage.ExploreBrands_description}
        />
      </Container>
      <Divider hidden section />
      <ModelViewer {...props} />
      <Divider hidden section />
    </section>
  );
}
