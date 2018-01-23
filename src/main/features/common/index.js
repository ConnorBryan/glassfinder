import React from "react";
import {
  Grid,
  Card,
  Image,
  Popup,
  Item,
  Button,
  Segment,
  Header,
  Icon
} from "semantic-ui-react";
import styled from "styled-components";

export const genericSorts = [
  {
    icon: "calendar",
    name: "newer",
    func: (a, b) => {
      const { createdAt: aCreated } = a;
      const { createdAt: bCreated } = b;
      const aTime = new Date(aCreated).getTime();
      const bTime = new Date(bCreated).getTime();

      return aTime < bTime ? -1 : 1;
    }
  },
  {
    icon: "calendar",
    name: "older",
    func: (a, b) => {
      const { createdAt: aCreated } = a;
      const { createdAt: bCreated } = b;
      const aTime = new Date(aCreated).getTime();
      const bTime = new Date(bCreated).getTime();

      return aTime > bTime ? -1 : 1;
    }
  },
  {
    icon: "sort alphabet ascending",
    name: "name a-z",
    func: (a, b) => {
      const { name: aName } = a;
      const { name: bName } = b;

      return aName.localeCompare(bName);
    }
  },
  {
    icon: "sort alphabet descending",
    name: "name z-a",
    func: (a, b) => {
      const { name: aName } = a;
      const { name: bName } = b;

      return bName.localeCompare(aName);
    }
  }
];

export function renderGenericTile(models, loadDetailsModeFromExploreMode) {
  const Styles = styled.div`
    .model-name {
      text-transform: uppercase !important;
      letter-spacing: 0.33rem !important;
    }
    .segment {
      min-height: 55vh !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
    }
  `;

  if (models.length === 0) {
    return (
      <Styles>
        <Segment basic>
          <Header as="h2">
            <Icon name="warning sign" /> There is nothing to show.
          </Header>
        </Segment>
      </Styles>
    );
  }

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
        } else {
          return null;
        }
      })}
    </Grid.Row>
  );

  return (
    <Styles>
      <Grid columns={3}>
        <Row models={topRow} />
        <Row models={bottomRow} />
      </Grid>
    </Styles>
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
    .segment {
      min-height: 55vh !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
    }
  `;

  if (models.length === 0) {
    return (
      <Styles>
        <Segment basic>
          <Header as="h2">
            <Icon name="warning sign" /> There is nothing to show.
          </Header>
        </Segment>
      </Styles>
    );
  }

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
          <Item key={index}>
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
    .segment {
      min-height: 55vh !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
    }
  `;

  if (models.length === 0) {
    return (
      <Styles>
        <Segment basic>
          <Header as="h2">
            <Icon name="warning sign" /> There is nothing to show.
          </Header>
        </Segment>
      </Styles>
    );
  }

  const displayLocal = model => (
    <Card.Meta
      content={
        model.city && model.state ? `${model.city}, ${model.state}` : model.from
      }
    />
  );

  return (
    <Styles>
      <Card.Group itemsPerRow={2} stackable>
        {models.map((model, index) => (
          <Card key={index} centered fluid>
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
    </Styles>
  );
}
