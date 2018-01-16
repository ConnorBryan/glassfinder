import React from "react";
import { Redirect } from "react-router-dom";
import { partial } from "lodash";

import API from "../../../../services";
import {
  renderGenericTile,
  renderGenericItem,
  renderGenericCard
} from "../../../../features/common";
import ModelViewer from "../../../ModelViewer";

export default function MyPiecesViewer({ account }) {
  if (!account) return <Redirect to="/sign-in" />;

  const props = {
    exploreService: partial(API.fetchPiecesForId, account.id),
    detailService: partial(API.fetchModel, "piece", "pieces"),
    uri: "/my-account/view-my-pieces",
    cacheTerm: "myPieces",
    plural: "pieces",
    singular: "pieces",
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
