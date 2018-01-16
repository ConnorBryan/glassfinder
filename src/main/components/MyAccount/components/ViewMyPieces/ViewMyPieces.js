import React from "react";
import { Link, Redirect } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { partial } from "lodash";

import API from "../../../../services";
import {
  renderGenericTile,
  renderGenericItem,
  renderGenericCard
} from "../../../../features/common";
import ModelViewer from "../../../ModelViewer";

export default function MyPiecesViewer({ account, history }) {
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
      return (
        <Button.Group>
          <Button
            onClick={() => {
              history.push(
                `/my-account/view-my-pieces/${piece.id}/upload-image`,
                {
                  piece
                }
              );
            }}
          >
            Upload image
          </Button>
          <Button
            onClick={() => {
              history.push(
                `/my-account/view-my-pieces/${piece.id}/update-information`,
                {
                  piece
                }
              );
            }}
          >
            Update information
          </Button>
        </Button.Group>
      );
    }
  };

  return <ModelViewer {...props} />;
}
