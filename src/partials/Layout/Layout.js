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
  Card
} from "semantic-ui-react";
import { Parallax } from "react-parallax";
import styled from "styled-components";

import services from "../../slices/shops/services";
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

function Layout(props) {
  const model = {
    exploreService: services.fetchShops,
    detailService: services.fetchShop,
    plural: "shops",
    singular: "shop",
    renderTile: (models, loadDetailsModeFromExploreMode) => {
      const style = {
        width: "10rem",
        height: "10rem",
        border: "1px solid",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      };
      return models.map((model, index) => (
        <div key={index} style={style}>
          {model.id}
          <button onClick={() => loadDetailsModeFromExploreMode(model.id)}>
            View details
          </button>
        </div>
      ));
    },
    renderItem: (models, loadDetailsModeFromExploreMode) => {
      const style = {
        width: "30rem",
        height: "10rem",
        border: "1px solid blue",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      };

      return models.map((model, index) => (
        <div key={index} style={style}>
          {model.name}
        </div>
      ));
    },
    renderCard: (models, loadDetailsModeFromExploreMode) => {
      const style = {
        width: "20rem",
        height: "10rem",
        border: "1px solid red",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      };

      return models.map((model, index) => (
        <div key={index} style={style}>
          {model.name}
        </div>
      ));
    },
    renderDetail: model => {
      const style = {
        width: "20rem",
        height: "10rem",
        border: "1px solid red",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      };

      return <div style={style}>{model.name}</div>;
    }
  };

  return (
    <Container fluid>
      <Segment basic>
        <Navbar />
      </Segment>
      {/*<Segment.Group>
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
      </Segment.Group>*/}
      <Segment basic>
        <ModelViewer {...model} />
      </Segment>
    </Container>
  );
}

export default Layout;

// Styling
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
