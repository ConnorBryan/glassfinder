import React from "react";
import {
  Grid,
  Card,
  Image,
  Popup,
  Item,
  Button,
  Icon
} from "semantic-ui-react";
import styled from "styled-components";

export function renderGenericTile(models, loadDetailsModeFromExploreMode) {
  const topRow = [models[0], models[1], models[2]].filter(x => x);
  const bottomRow = [models[3], models[4], models[5]].filter(x => x);
  const Row = ({ models }) => (
    <Grid.Row>
      {models.map((model, index) => {
        if (model) {
          const TileCard = (
            <Card
              onClick={() => loadDetailsModeFromExploreMode(model.id)}
              centered
            >
              <Image src={model.image} />
            </Card>
          );

          const TilePopup = () => (
            <Popup trigger={TileCard} inverted>
              <Popup.Header content={model.name} />
              <Popup.Content content={model.description} />
            </Popup>
          );

          return (
            <Grid.Column key={index}>
              <TilePopup />
            </Grid.Column>
          );
        }
      })}
    </Grid.Row>
  );

  return (
    <Grid columns={3}>
      <Row models={topRow} />
      <Row models={bottomRow} />
    </Grid>
  );
}

export function renderGenericItem(models, loadDetailsModeFromExploreMode) {
  const Styles = styled.div`
    .item.group {
      .item {
        padding: 2rem 1rem 2rem 1rem !important;
      }

      button {
        text-transform: uppercase !important;
        letter-spacing: 0.25rem !important;
      }
    }
  `;

  const displayLocal = model => (
    <Item.Meta
      content={
        model.city && model.state ? `${model.city}, ${model.state}` : model.from
      }
    />
  );

  return (
    <Styles>
      <Item.Group divided>
        {models.map((model, index) => (
          <Item>
            <Item.Image
              size="small"
              src={model.image}
              onClick={() => loadDetailsModeFromExploreMode(model.id)}
            />
            <Item.Content>
              <Item.Header as="h2" content={model.name} />
              {displayLocal(model)}
              <Item.Description content={model.description} />
              <Item.Extra>
                <Button
                  floated="right"
                  onClick={() => loadDetailsModeFromExploreMode(model.id)}
                  primary
                >
                  Visit {model.name} <Icon name="chevron right" />
                </Button>
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Styles>
  );
}

export function renderGenericCard(models, loadDetailsModeFromExploreMode) {
  const Styles = styled.div`
    .card.group {
      .image {
        cursor: pointer !important;
      }
      button {
        text-transform: uppercase !important;
        letter-spacing: 0.25rem !important;
      }
    }
  `;
  const displayLocal = model => (
    <Card.Meta
      content={
        model.city && model.state ? `${model.city}, ${model.state}` : model.from
      }
    />
  );

  return (
    <Card.Group itemsPerRow={3} stackable>
      {models.map((model, index) => (
        <Card centered fluid>
          <Image
            src={model.image}
            onClick={() => loadDetailsModeFromExploreMode(model.id)}
          />
          <Card.Content>
            <Card.Header as="h2" content={model.name} />
            {displayLocal(model)}
            <Card.Description content={model.description} />
          </Card.Content>
          <Card.Content extra>
            <Button
              floated="right"
              onClick={() => loadDetailsModeFromExploreMode(model.id)}
              primary
              fluid
            >
              Visit {model.name} <Icon name="chevron right" />
            </Button>
          </Card.Content>
        </Card>
      ))}
    </Card.Group>
  );
}
