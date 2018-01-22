import React from "react";
import PropTypes from "prop-types";
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

export function ArtistViewer({ verbiage }) {
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
      <Container>
        <ScreenHeader
          icon={ICON_SET[LINK_TYPES.ARTIST]}
          title={verbiage.ExploreArtists_title}
          description={verbiage.ExploreArtists_description}
        />
      </Container>
      <Divider hidden section />
      <ModelViewer {...props} />
      <Divider hidden section />
    </section>
  );
}

ArtistViewer.propTypes = {
  verbiage: PropTypes.objectOf(PropTypes.string).isRequired
};
