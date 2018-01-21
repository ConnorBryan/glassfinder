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

export function ArtistHero({ verbiage }) {
  const props = {
    image: "https://placehold.it/400x400",
    title: verbiage.Home_artistFeatureHeader,
    description: verbiage.Home_artistFeatureDescription,
    flipped: false,
    buttonContent: verbiage.Home_artistFeatureButton,
    link: "/artists"
  };

  return <Featured {...props} />;
}

export function ArtistViewer() {
  const props = {
    exploreService: API.fetchArtists,
    detailService: API.fetchArtist,
    uri: "/artists",
    plural: "artists",
    singular: "artist",
    icon: "paint brush",
    renderTile: renderGenericTile,
    renderItem: renderGenericItem,
    renderCard: renderGenericCard,
    renderDetail: artist => {
      return <p>{artist.name}</p>;
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
