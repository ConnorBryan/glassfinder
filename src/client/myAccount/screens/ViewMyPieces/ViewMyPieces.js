import React from "react";
import { Redirect, Link } from "react-router-dom";
import {
  Responsive,
  Container,
  Button,
  Segment,
  Icon,
  Item,
  Menu
} from "semantic-ui-react";
import { partial } from "lodash";
import styled from "styled-components";
import accounting from "accounting";
import Aux from "react-aux";

import * as config from "../../../../config";
import Thing from "../../../components/Thing";
import ModelExplorer from "../../../components/ModelExplorer";
import ModelDetail from "../../../components/ModelDetail";
import API from "../../../services";
import {
  genericSorts,
  renderGenericTile,
  renderGenericItem,
  renderGenericCard
} from "../../../features/common";
import ModelViewer from "../../../components/ModelViewer";
import ScreenHeader from "../../../components/ScreenHeader";

export function MyPieceThing(props) {
  const {
    id,
    name: title,
    maker,
    image,
    price: top,
    location: bottom,
    description: content,
    verbiage,
    history
  } = props;

  const linkRoot = `/my-account/view-my-pieces/${id}`;

  const updateInformationLink = `${linkRoot}/update-information`;

  const editPiece = () =>
    history.push(updateInformationLink, {
      piece: {
        id,
        name: title,
        maker,
        image,
        price: top,
        location: bottom,
        description: content
      }
    });

  const removePiece = async () => {
    const removeConfirmed = window.confirm(
      verbiage.ViewMyPieces_confirmRemoval
    );

    if (removeConfirmed) {
      const wasSuccessful = await API.removePiece(id);

      wasSuccessful
        ? window.location.reload()
        : alert(verbiage.ViewMyPieces_unableToRemove);
    }
  };

  const actions = [
    {
      icon: "eye",
      content: "View",
      as: Link,
      to: `/my-account/view-my-pieces/${id}`
    },
    {
      icon: "pencil",
      content: "Edit",
      onClick: editPiece
    },
    {
      icon: "trash",
      content: "Remove",
      onClick: removePiece
    }
  ];

  return (
    <Thing
      {...{
        title,
        image,
        top: accounting.formatMoney(top),
        bottom,
        content,
        actions
      }}
    />
  );
}

export function MyPieceDetail({ verbiage, history, id }) {
  const props = {
    id,
    fetchModel: API.fetchPiece,
    render: model => <MyPieceThing {...{ verbiage, history }} {...model} />
  };

  return <ModelDetail {...props} />;
}

export default function MyPieceExplorer({ verbiage, history, account }) {
  if (!account || !account.id) return <Redirect to="/sign-in" />;

  const props = {
    icon: config.ICON_SET[config.LINK_TYPES.PIECE],
    title: `My ${config.LINK_TYPES_TO_RESOURCES[config.LINK_TYPES.PIECE]}`,
    resource: config.LINK_TYPES_TO_RESOURCES[config.LINK_TYPES.PIECE],
    fetchModels: partial(API.fetchPiecesForId, account.id),
    cacheKey: "myPieces",
    cacheExpiration: 1000 * 1000 * 1000,
    renderItems: (models = []) =>
      models.map((model, index) => (
        <MyPieceThing {...{ verbiage, history }} key={index} {...model} />
      )),

    detailTitle: `Pictures`,
    fetchDetailModels: async () => ({
      page: [],
      totalPages: 1,
      totalModels: 0,
      perPage: 6
    }),
    renderDetail: id => <MyPieceDetail {...{ verbiage, history, id }} />,
    renderDetailItems: (models = []) =>
      models.map((model, index) => {
        return <p key={index}>Derp</p>;
      })
  };

  return (
    <Aux>
      <Responsive maxWidth={Responsive.onlyTablet.maxWidth}>
        <ModelExplorer compact {...props} />
      </Responsive>
      <Responsive minWidth={Responsive.onlyComputer.minWidth}>
        <ModelExplorer {...props} />
      </Responsive>
    </Aux>
  );
}

export function MyPiecesViewer({ verbiage, account, history }) {
  if (!account) return <Redirect to="/sign-in" />;

  const props = {
    exploreService: partial(API.fetchPiecesForId, account.id),
    detailService: partial(API.fetchModel, "piece", "pieces"),
    uri: "/my-account/view-my-pieces",
    cacheTerm: "myPieces",
    plural: "pieces",
    singular: "pieces",
    icon: "puzzle",
    sorts: genericSorts,
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
          verbiage.ViewMyPieces_confirmRemoval
        );

        if (removeConfirmed) {
          const wasSuccessful = await API.removePiece(id);

          wasSuccessful
            ? history.push("/my-account/view-my-pieces")
            : alert(verbiage.ViewMyPieces_unableToRemove);
        }
      };

      return (
        <Styles>
          <Container>
            <Segment>
              <ScreenHeader
                icon={config.ICON_SET[config.LINK_TYPES.PIECE]}
                title={verbiage.ViewMyPieces_title}
                description={verbiage.ViewMyPieces_description}
              />
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
                      <Item.Extra
                        content={`${verbiage.ViewMyPieces_madeBy} ${maker}`}
                      />
                      <Item.Extra
                        content={`${verbiage.ViewMyPieces_locatedAt} ${location}`}
                      />
                    </Item.Content>
                  </Item>
                </Item.Group>
              </Segment>
              <Menu attached="bottom" widths={2} stackable>
                <Menu.Item className="fancy" onClick={onUpdateInformationClick}>
                  <Icon name="pencil" /> {verbiage.ViewMyPieces_editPiece}
                </Menu.Item>
                <Menu.Item
                  as={Button}
                  className="fancy"
                  negative
                  onClick={removePiece}
                >
                  <Icon name="trash outline" />{" "}
                  {verbiage.ViewMyPieces_removePiece}
                </Menu.Item>
              </Menu>
            </Segment>
          </Container>
        </Styles>
      );
    }
  };

  return <ModelViewer {...props} />;
}
