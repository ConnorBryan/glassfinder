import React from "react";
import PropTypes from "prop-types";
import {
  Container,
  Segment,
  Divider,
  Button,
  Item,
  Icon
} from "semantic-ui-react";

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

export function PieceHero({ verbiage }) {
  const props = {
    image: "/pieces.jpg",
    title: verbiage.Home_pieceFeatureHeader,
    description: verbiage.Home_pieceFeatureDescription,
    flipped: true,
    buttonContent: verbiage.Home_pieceFeatureButton,
    link: "/pieces"
  };

  return <Featured {...props} />;
}

export function PieceViewer({ verbiage }) {
  const props = {
    exploreService: API.fetchPieces,
    detailService: API.fetchPiece,
    uri: "/pieces",
    plural: "pieces",
    singular: "piece",
    icon: "puzzle",
    renderTile: renderGenericTile,
    renderItem: renderGenericItem,
    renderCard: renderGenericCard,
    renderDetail: ({ image, name, price, description, maker, location }) => {
      return (
        <Segment clearing>
          <Item.Group>
            <Item>
              <Item.Image size="medium" src={image} />
              <Item.Content>
                <Item.Header as="h3" content={name} />
                <Item.Meta>${price}</Item.Meta>
                <Item.Description content={description} />
                <Item.Extra content={`Made by ${maker}`} />
                <Item.Extra content={`Located at ${location}`} />
              </Item.Content>
            </Item>
          </Item.Group>
          <Divider hidden />
          <Button floated="right" primary>
            <Icon name="dollar" /> Purchase this piece
          </Button>
        </Segment>
      );
    }
  };

  return (
    <section>
      <Container>
        <ScreenHeader
          icon={ICON_SET[LINK_TYPES.PIECE]}
          title={verbiage.ExplorePieces_title}
          description={verbiage.ExplorePieces_description}
        />
      </Container>
      <Divider hidden section />
      <ModelViewer {...props} />
      <Divider hidden section />
    </section>
  );
}

PieceViewer.propTypes = {
  verbiage: PropTypes.objectOf(PropTypes.string).isRequired
};
