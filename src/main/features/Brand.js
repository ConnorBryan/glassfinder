import React from "react";
import { Divider } from "semantic-ui-react";

import Featured from "../components/Featured";
import ModelViewer from "../components/ModelViewer";
import API from "../services";
import {
  renderGenericTile,
  renderGenericItem,
  renderGenericCard
} from "./common";

export function BrandHero() {
  const props = {
    image: "/brands.jpg",
    title: "Brands",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia ipsa consequatur, placeat dignissimos esse provident natus ratione magni id odit nemo quasi dicta quidem! Beatae nostrum consectetur explicabo unde esse.",
    flipped: false,
    buttonContent: "Explore brands",
    link: "/brands"
  };

  return <Featured {...props} />;
}

export function BrandViewer() {
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
      <Divider hidden section />
      <ModelViewer {...props} />
      <Divider hidden section />
    </section>
  );
}
