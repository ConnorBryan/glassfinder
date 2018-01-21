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

export function ArtistHero() {
  const props = {
    image: "https://placehold.it/400x400",
    title: "Artists",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia ipsa consequatur, placeat dignissimos esse provident natus ratione magni id odit nemo quasi dicta quidem! Beatae nostrum consectetur explicabo unde esse.",
    flipped: false,
    buttonContent: "Explore artists",
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
