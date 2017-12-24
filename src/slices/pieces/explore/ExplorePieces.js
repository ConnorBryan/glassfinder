import React from "react";
import { Card, Segment } from "semantic-ui-react";

import config from "../../../config";
import withPageHeader from "../../../providers/withPageHeader";
import PieceCard from "../../../components/PieceCard";

function ExplorePieces(props) {
  return (
    <Segment.Group>
      <Segment>
        <Card.Group stackable itemsPerRow={3}>
          {config.pieces.map(piece => (
            <PieceCard
              key={piece.key}
              linked
              artistLinked
              shopLinked
              purchaseLinked
              {...piece}
            />
          ))}
        </Card.Group>
      </Segment>
    </Segment.Group>
  );
}

export default withPageHeader(config.pageHeaders.explorePieces, ExplorePieces);
