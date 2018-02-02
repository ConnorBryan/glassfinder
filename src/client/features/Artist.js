import React from "react";
import { Container, Divider } from "semantic-ui-react";

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

export function ArtistExplorer() {
  const props = {
    icon: config.ICON_SET[config.LINK_TYPES.ARTIST],
    title: `Explore ${config.LINK_TYPES_TO_RESOURCES[
      config.LINK_TYPES.ARTIST
    ]}`,
    resource: config.LINK_TYPES_TO_RESOURCES[config.LINK_TYPES.ARTIST],
    fetchModels: API.fetchArtists,
    cacheKey: config.ARTIST_CACHE_KEY,
    cacheExpiration: config.ARTIST_CACHE_EXPIRATION,
    renderItems: (models = []) =>
      models.map(
        ({ name: title, image, from: bottom, description: content }, index) => (
          <Thing key={index} {...{ title, image, bottom, content }} />
        )
      )
  };

  return <ModelExplorer {...props} />;
}

export function ArtistViewer({ verbiage }) {
  const props = {
    exploreService: API.fetchArtists,
    detailService: API.fetchArtist,
    uri: "/artists",
    plural: "artists",
    singular: "artist",
    icon: "paint brush",
    sorts: genericSorts,
    renderTile: renderGenericTile,
    renderItem: renderGenericItem,
    renderCard: renderGenericCard,
    renderDetail: artist => {
      return <p>{artist.name}</p>;
    }
  };

  return (
    <Container>
      <ScreenHeader
        icon={config.ICON_SET[config.LINK_TYPES.ARTIST]}
        title={verbiage.ExploreArtists_title}
        description={verbiage.ExploreArtists_description}
      />
      <Divider hidden section />
      <ModelViewer {...props} />
      <Divider hidden section />
    </Container>
  );
}
