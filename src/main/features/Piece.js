import React from "react";

import Featured from "../components/Featured";
import ModelViewer from "../components/ModelViewer";
import API from "../services";
import {
  renderGenericTile,
  renderGenericItem,
  renderGenericCard
} from "./common";

export function PieceHero() {
  const props = {
    image: "/pieces.jpg",
    title: "Pieces",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia ipsa consequatur, placeat dignissimos esse provident natus ratione magni id odit nemo quasi dicta quidem! Beatae nostrum consectetur explicabo unde esse.",
    flipped: true,
    buttonContent: "Explore pieces",
    link: "/pieces"
  };

  return <Featured {...props} />;
}

export function PieceViewer() {
  const props = {
    exploreService: API.fetchPieces,
    detailService: API.fetchPiece,
    plural: "pieces",
    singular: "piece",
    icon: "puzzle",
    renderTile: renderGenericTile,
    renderItem: renderGenericItem,
    renderCard: renderGenericCard,
    renderDetail: piece => {
      return <p>{piece.name}</p>;
    }
  };

  return <ModelViewer {...props} />;
}
