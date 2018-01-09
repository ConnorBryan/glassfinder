import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Container,
  Segment,
  Menu,
  Button,
  Icon,
  Responsive,
  Image,
  Header,
  Item,
  Card,
  Grid,
  Popup,
  Divider
} from "semantic-ui-react";
import { Parallax } from "react-parallax";
import styled from "styled-components";
import Aux from "react-aux";

// import shopServices from "../../slices/shops/services";
// import artistServices from "../../slices/artists/services";
// import brandServices from "../../slices/brands/services";
// import pieceServices from "../../slices/pieces/services";
import API from "../../services";
import ModelViewer from "../../components/ModelViewer";

// Navbar

function MobileNavbar(props) {
  return (
    <Menu as={MobileNav} widths={2} borderless secondary>
      <Menu.Item onClick={() => {}}>
        <Image size="small" src="/logo.png" />
      </Menu.Item>
      <Menu.Item position="right" onClick={() => alert("Yeah!")}>
        <Icon name="bars" />
      </Menu.Item>
    </Menu>
  );
}

function DesktopNavbar(props) {
  return (
    <Menu borderless secondary>
      <Menu.Item onClick={() => {}}>
        <Image size="small" src="/logo.png" />
      </Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item onClick={() => {}}>Link A</Menu.Item>
        <Menu.Item onClick={() => {}}>Link B</Menu.Item>
        <Menu.Item onClick={() => {}}>Link C</Menu.Item>
        <Menu.Item as={GetStarted}>
          <Button primary basic>
            Get started <Icon name="send" />
          </Button>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
}

function Navbar(props) {
  return (
    <Container>
      <Responsive maxWidth={Responsive.onlyTablet.maxWidth}>
        <MobileNavbar />
      </Responsive>
      <Responsive minWidth={Responsive.onlyTablet.maxWidth}>
        <DesktopNavbar />
      </Responsive>
    </Container>
  );
}

// ModelViewer

// Home

function Splash(props) {
  return (
    <Parallax bgImage="/city.jpg" strength={400} basic>
      <Container>
        <Splasher>
          <Segment padded="very" textAlign="center" basic>
            <Header>
              Paraphernalia, <em>revolutionized</em>.
            </Header>
            <Header content="Welcome to the new way of lighting up." />
            <Button.Group as={GetStarted}>
              <Button primary>
                Get started <Icon name="send" />
              </Button>
            </Button.Group>
          </Segment>
        </Splasher>
      </Container>
    </Parallax>
  );
}

function MobileFeatured(props) {
  const { image, title, description, buttonContent, buttonOnClick } = props;

  return (
    <Card.Group>
      <Card fluid raised>
        <Image src={image} />
        <Card.Content textAlign="center">
          <Card.Header as="h1">{title}</Card.Header>
          <Card.Description>{description}</Card.Description>
        </Card.Content>
        <Card.Content
          as={Button}
          content={buttonContent}
          onClick={buttonOnClick}
          color="blue"
          fluid
          extra
        >
          {buttonContent}
          <Icon name="chevron right" />
        </Card.Content>
      </Card>
    </Card.Group>
  );
}

function DesktopFeatured(props) {
  const {
    image,
    description,
    title,
    flipped,
    buttonContent,
    buttonOnClick
  } = props;

  return (
    <Item.Group>
      <Item>
        {!flipped && <Item.Image size="large" src={image} circular />}
        <Item.Content>
          <Item.Header as="h1">{title}</Item.Header>
          <Item.Description>{description}</Item.Description>
          <Item.Extra>
            <Button
              content={buttonContent}
              onClick={buttonOnClick}
              size="large"
              floated={flipped ? "left" : "right"}
              primary
            />
          </Item.Extra>
        </Item.Content>
        {flipped && <Item.Image size="large" src={image} circular />}
      </Item>
    </Item.Group>
  );
}

function Featured(props) {
  return (
    <Container>
      <section>
        <Responsive maxWidth={Responsive.onlyTablet.maxWidth}>
          <MobileFeatured {...props} />
        </Responsive>
        <Responsive minWidth={Responsive.onlyTablet.maxWidth}>
          <DesktopFeatured {...props} />
        </Responsive>
      </section>
    </Container>
  );
}

function Shops() {
  const props = {
    image: "/shops.jpg",
    title: "Shops",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia ipsa consequatur, placeat dignissimos esse provident natus ratione magni id odit nemo quasi dicta quidem! Beatae nostrum consectetur explicabo unde esse.",
    flipped: false,
    buttonContent: "Explore shops",
    buttonOnClick: () => {}
  };

  return <Featured {...props} />;
}

function Pieces() {
  const props = {
    image: "/pieces.jpg",
    title: "Pieces",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia ipsa consequatur, placeat dignissimos esse provident natus ratione magni id odit nemo quasi dicta quidem! Beatae nostrum consectetur explicabo unde esse.",
    flipped: true,
    buttonContent: "Explore pieces",
    buttonOnClick: () => {}
  };

  return <Featured {...props} />;
}

function Brands() {
  const props = {
    image: "/brands.jpg",
    title: "Brands",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia ipsa consequatur, placeat dignissimos esse provident natus ratione magni id odit nemo quasi dicta quidem! Beatae nostrum consectetur explicabo unde esse.",
    flipped: false,
    buttonContent: "Explore brands",
    buttonOnClick: () => {}
  };

  return <Featured {...props} />;
}

// Layout
function renderGenericTile(models, loadDetailsModeFromExploreMode) {
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

function renderGenericItem(models, loadDetailsModeFromExploreMode) {
  const displayLocal = model => (
    <Item.Meta
      content={
        model.city && model.state ? `${model.city}, ${model.state}` : model.from
      }
    />
  );

  return (
    <Item.Group divided>
      {models.map((model, index) => (
        <Item as={Padded}>
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
                as={Fancy}
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
  );
}

function renderGenericCard(models, loadDetailsModeFromExploreMode) {
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
            as={Clicky}
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
              as={Fancy}
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

function Layout(props) {
  const pieces = {
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

  const shops = {
    exploreService: API.fetchShops,
    detailService: API.fetchShop,
    plural: "shops",
    singular: "shop",
    icon: "cart",
    renderTile: renderGenericTile,
    renderItem: renderGenericItem,
    renderCard: renderGenericCard,
    renderDetail: model => {
      const DetailSplash = styled.div`
        min-height: 60vh !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;

        .item {
          color: white !important;
          background: rgba(220, 220, 220, 0.75) !important;
        }

        .button {
          margin: 0 0.5rem 0 0.5rem !important;
        }
      `;

      return (
        <Aux>
          <Parallax
            bgImage="https://wallpapercave.com/wp/AumsrZG.jpg"
            strength={200}
            basic
          >
            <Item.Group as={DetailSplash}>
              <Item as={Padded}>
                <Item.Content>
                  <Item.Header as="h2" content={model.name} />
                  <Item.Meta
                    content={`${model.street} ${model.city}, ${model.state} ${model.zip}`}
                  />
                  <Item.Description content={model.description} />
                  <Divider inverted section />
                  <Button.Group floated="right">
                    <Button secondary>
                      <Icon name="phone" /> {model.phone}
                    </Button>
                    <Button secondary>
                      <Icon name="envelope" /> {model.email}
                    </Button>
                    <Button as={Fancy} primary>
                      <Icon name="map pin" /> Find on map
                    </Button>
                  </Button.Group>
                </Item.Content>
              </Item>
            </Item.Group>
          </Parallax>
          <ModelViewer {...pieces} />
        </Aux>
      );
    }
  };

  const artists = {
    exploreService: API.fetchArtists,
    detailService: API.fetchArtist,
    plural: "artists",
    singular: "artist",
    icon: "paint brush",
    renderTile: renderGenericTile,
    renderItem: renderGenericItem,
    renderCard: renderGenericCard,
    renderDetail: artist => {
      return <p>{artist.name}</p>;
    }
  };

  const brands = {
    exploreService: API.fetchBrands,
    detailService: API.fetchBrand,
    plural: "brands",
    singular: "brand",
    icon: "building",
    renderTile: renderGenericTile,
    renderItem: renderGenericItem,
    renderCard: renderGenericCard,
    renderDetail: brand => {
      return <p>{brand.name}</p>;
    }
  };

  return (
    <Container fluid>
      <Segment basic>
        <Navbar />
      </Segment>
      <Segment.Group>
        <Segment as={NoPadding} basic>
          <Splash />
        </Segment>
        <FeatureSet>
          <Segment color="blue" secondary>
            <Shops />
          </Segment>
          <Segment color="blue" tertiary>
            <Pieces />
          </Segment>
          <Segment color="blue" secondary>
            <Brands />
          </Segment>
        </FeatureSet>
        <Segment tertiary>
          <ModelViewer {...shops} />
        </Segment>
        <Segment secondary>
          <ModelViewer {...artists} />
        </Segment>
        <Segment tertiary>
          <ModelViewer {...brands} />
        </Segment>
      </Segment.Group>
    </Container>
  );
}

export default Layout;

// Styling
const Fancy = styled.div`
  text-transform: uppercase !important;
  letter-spacing: 0.25rem !important;
`;

const Padded = styled.div`
  padding: 2rem 1rem 2rem 1rem !important;

  .image {
    cursor: pointer !important;
  }
`;

const Clicky = styled.div`cursor: pointer !important;`;

const GetStarted = styled.div`
  button {
    letter-spacing: 0.33rem !important;
    text-transform: uppercase !important;
  }
`;

const NoPadding = styled.div`padding: 0 !important;`;

const MobileNav = styled.div`
  .right.item {
    display: inline !important;
    text-align: right !important;
  }
`;

const Splasher = styled.div`
  min-height: 80vh !important;
  display: flex;
  align-items: center;
  justify-content: center;

  em {
    color: #2185d0 !important;
  }

  .header:first-child {
    font-size: 3rem !important;
  }

  .header:second-child {
    font-size: 2rem !important;
  }

  .segment {
    background: rgba(255, 255, 255, 0.5) !important;
  }
`;

const FeatureSet = styled.div`
  section {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    min-height: 60vh !important;
  }

  h1 {
    font-size: 3rem !important;
    letter-spacing: 0.33rem !important;
    text-transform: uppercase !important;
  }

  button {
    margin-top: 1.5rem !important;
    letter-spacing: 0.33rem !important;
    text-transform: uppercase !important;
    background: #2185d0 !important;
    color: white !important;
  }

  .header {
    background: rgba(33, 133, 208, 0.1) !important;
    margin-bottom: 2rem !important;
    padding: 1rem 2rem 1rem 2rem !important;
  }

  .container {
    margin-top: 4rem !important;
    margin-bottom: 4rem !important;
  }

  .description {
    font-size: 1.5rem !important;
    line-height: 1.75rem !important;
  }

  .segment {
    margin: 0 !important;
  }

  .item.content {
    padding-left: 3rem !important;
  }
`;
