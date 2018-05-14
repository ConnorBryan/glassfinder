import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Responsive, Container, Divider } from "semantic-ui-react";
import Aux from "react-aux";
import styled from "styled-components";

import * as config from "../../config";
import ScreenHeader from "../components/ScreenHeader";
import Thing from "../components/Thing";
import ModelExplorer from "../components/ModelExplorer";
import ModelDetail from "../components/ModelDetail";
import ModelViewer from "../components/ModelViewer";
import API from "../services";
import {
  genericSorts,
  renderGenericTile,
  renderGenericItem,
  renderGenericCard
} from "./common";
import { PieceThing } from "./Piece";

function ArtistThing(props) {
  const { id, name: title, image, from: bottom, description: content } = props;

  const actions = [
    {
      icon: config.ICON_SET[config.LINK_TYPES.ARTIST],
      content: "Visit profile",
      as: Link,
      to: `/artists/${id}`
    }
  ];

  return <Thing {...{ title, image, bottom, content, actions }} />;
}

function ArtistDetail({ id }) {
  const props = {
    id,
    fetchModel: API.fetchArtist,
    render: model => <ArtistThing {...model} />
  };

  return <ModelDetail {...props} />;
}

export class ArtistExplorer extends Component {
  state = {
    loadingCreditedPieces: true,
    creditedPieces: []
  };

  componentDidMount() {
    this.fetchCreditedPieces();
  }

  fetchCreditedPieces = async () => {
    try {
      const {
        match: {
          params: { id }
        }
      } = this.props;

      if (!id) {
        return this.setState({
          loadingCreditedPieces: false,
          creditedPieces: []
        });
      }

      const fromArtist = await API.getCreditedPieces(id);

      this.setState({
        loadingCreditedPieces: false,
        creditedPieces: fromArtist
      });
    } catch (e) {
      this.setState({
        loadingCreditedPieces: false,
        creditedPieces: []
      });
    }
  };

  render() {
    const { creditedPieces } = this.state;
    const props = {
      icon: config.ICON_SET[config.LINK_TYPES.ARTIST],
      title: `Explore ${
        config.LINK_TYPES_TO_RESOURCES[config.LINK_TYPES.ARTIST]
      }`,
      detailTitle: `Available Pieces`,
      resource: config.LINK_TYPES_TO_RESOURCES[config.LINK_TYPES.ARTIST],
      fetchModels: API.fetchArtists,
      fetchDetailModels: API.fetchArtistPieces,
      renderDetail: id => <ArtistDetail {...{ id }} />,
      cacheKey: config.ARTIST_CACHE_KEY,
      cacheExpiration: config.ARTIST_CACHE_EXPIRATION,
      renderItems: (models = []) =>
        models.map((model, index) => <ArtistThing key={index} {...model} />),
      renderDetailItems: (models = []) =>
        models.map((model, index) => <PieceThing key={index} {...model} />)
    };
    const CreditedPieces = styled.div`
      color: white;
    `;
    return (
      <Aux>
        <Responsive maxWidth={Responsive.onlyTablet.maxWidth}>
          <ModelExplorer compact {...props} />
          {creditedPieces.length > 0 && (
            <CreditedPieces>
              <h1>Credited Pieces</h1>
              {creditedPieces.map(piece => (
                <PieceThing key={piece.name} {...piece} />
              ))}
            </CreditedPieces>
          )}
        </Responsive>
        <Responsive minWidth={Responsive.onlyComputer.minWidth}>
          <ModelExplorer {...props} />
          {creditedPieces.length > 0 && (
            <CreditedPieces>
              <h1>Credited Pieces</h1>
              {creditedPieces.map(piece => (
                <PieceThing key={piece.name} {...piece} />
              ))}
            </CreditedPieces>
          )}
        </Responsive>
      </Aux>
    );
  }
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
