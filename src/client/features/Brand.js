import React from "react";
import { Responsive, Container, Divider } from "semantic-ui-react";
import Aux from "react-aux";

import * as config from "../../config";
import ScreenHeader from "../components/ScreenHeader";
import Thing from "../components/Thing";
import ModelExplorer from "../components/ModelExplorer";
import ModelViewer from "../components/ModelViewer";
import API from "../services";
import {
  genericSorts,
  renderGenericTile,
  renderGenericItem,
  renderGenericCard
} from "./common";

export function BrandExplorer() {
  const props = {
    icon: config.ICON_SET[config.LINK_TYPES.BRAND],
    title: `Explore ${config.LINK_TYPES_TO_RESOURCES[config.LINK_TYPES.BRAND]}`,
    resource: config.LINK_TYPES_TO_RESOURCES[config.LINK_TYPES.BRAND],
    fetchModels: API.fetchBrands,
    cacheKey: config.BRAND_CACHE_KEY,
    cacheExpiration: config.BRAND_CACHE_EXPIRATION,
    renderItems: (models = []) =>
      models.map(
        (
          {
            id,
            name: title,
            image,
            site: bottom,
            from: top,
            description: content
          },
          index
        ) => {
          const actions = [
            {
              icon: "download",
              content: "Download catalog",
              onClick: () => {}
            }
          ];

          return (
            <Thing
              key={index}
              {...{ title, image, top, bottom, content, actions }}
            />
          );
        }
      )
  };

  return (
    <Aux>
      <Responsive maxWidth={Responsive.onlyTablet.maxWidth}>
        <ModelExplorer compact {...props} />
      </Responsive>
      <Responsive minWidth={Responsive.onlyComputer.minWidth}>
        <ModelExplorer {...props} />
      </Responsive>
    </Aux>
  );
}

export function BrandViewer({ verbiage }) {
  const props = {
    exploreService: API.fetchBrands,
    detailService: API.fetchBrand,
    uri: "/brands",
    plural: "brands",
    singular: "brand",
    icon: "building",
    sorts: genericSorts,
    renderTile: renderGenericTile,
    renderItem: renderGenericItem,
    renderCard: renderGenericCard,
    renderDetail: brand => {
      return <p>{brand.name}</p>;
    }
  };

  return (
    <Container>
      <ScreenHeader
        icon={config.ICON_SET[config.LINK_TYPES.BRAND]}
        title={verbiage.ExploreBrands_title}
        description={verbiage.ExploreBrands_description}
      />
      <Divider hidden section />
      <ModelViewer {...props} />
      <Divider hidden section />
    </Container>
  );
}
