import React from "react";
import { Redirect } from "react-router-dom";
import { Button, Segment, Icon, Item, Menu } from "semantic-ui-react";
import { partial } from "lodash";
import styled from "styled-components";

import API from "../../../../services";
import { removeFromCache } from "../../../../util";
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
      const Styles = styled.div`
        .image:hover {
          cursor: pointer !important;
        }
        .fancy {
          text-transform: uppercase !important;
          letter-spacing: 0.33rem !important;
        }
        .icon {
          position: absolute !important;
          left: 1rem !important;
        }
      `;

      const { id, image, name, description, maker, location, price } = piece;
      const linkRoot = `/my-account/view-my-pieces/${id}`;
      const uploadImageLink = `${linkRoot}/upload-image`;
      const onUploadImageClick = () => history.push(uploadImageLink, { piece });
      const updateInformationLink = `${linkRoot}/update-information`;
      const onUpdateInformationClick = () =>
        history.push(updateInformationLink, { piece });
      const removePiece = async () => {
        const removeConfirmed = window.confirm(
          "Are you sure you want to remove this piece?\nThis cannot be undone."
        );

        if (removeConfirmed) {
          const successful = await API.removePiece(id);

          if (successful) {
            removeFromCache("myPieces");

            history.push("/my-account/view-my-pieces");
          } else {
            alert("The piece was unable to be removed.\nTry again later.");
          }
        }
      };

      return (
        <Styles>
          <Segment attached="top">
            <Item.Group>
              <Item>
                <Item.Image
                  size="medium"
                  src={image}
                  onClick={onUploadImageClick}
                />
                <Item.Content>
                  <Item.Header as="h3" content={name} />
                  <Item.Meta>${price}</Item.Meta>
                  <Item.Description content={description} />
                  <Item.Extra content={`Made by ${maker}`} />
                  <Item.Extra content={`Located at ${location}`} />
                </Item.Content>
              </Item>
            </Item.Group>
          </Segment>
          <Menu attached="bottom" widths={3} stackable>
            <Menu.Item className="fancy" onClick={onUploadImageClick}>
              <Icon name="picture" /> Upload image
            </Menu.Item>
            <Menu.Item className="fancy" onClick={onUpdateInformationClick}>
              <Icon name="pencil" /> Edit piece
            </Menu.Item>
            <Menu.Item
              as={Button}
              className="fancy"
              negative
              onClick={removePiece}
            >
              <Icon name="trash outline" /> Remove piece
            </Menu.Item>
          </Menu>
        </Styles>
      );
    }
  };

  return <ModelViewer {...props} />;
}

// <Button.Group>
//           <Button
//             onClick={() => {
//               history.push(
//                 `/my-account/view-my-pieces/${piece.id}/upload-image`,
//                 {
//                   piece
//                 }
//               );
//             }}
//           >
//             Upload image
//           </Button>
//           <Button
//             onClick={() => {
//               history.push(
//                 `/my-account/view-my-pieces/${piece.id}/update-information`,
//                 {
//                   piece
//                 }
//               );
//             }}
//           >
//             Update information
//           </Button>
//         </Button.Group>
