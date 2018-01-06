import React from "react";
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

function MobileNavbar(props) {
  return (
    <Menu widths={2} borderless secondary>
      <Menu.Item onClick={() => {}}>
        <Image size="small" src="/logo.png" />
      </Menu.Item>
      <Menu.Item
        as={HamburgerButton}
        position="right"
        onClick={() => alert("Yeah!")}
      >
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
          <Button primary>
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

function Splash(props) {
  return (
    <Parallax bgImage="/city.jpg" strength={400} basic>
      <Container>
        <Splasher>
          <Segment as={Ghost} padded="very" textAlign="center" basic>
            <Header as={Tagline}>
              Paraphernalia, <Emphasized>revolutionized.</Emphasized>
            </Header>
            <Header
              as={Subtagline}
              content="Welcome to the new way of lighting up."
            />
            <Button.Group as={GetStarted}>
              <Button basic primary>
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
        <Item.Content as={GimmeSomeSpace}>
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
      <Feature>
        <Responsive maxWidth={Responsive.onlyTablet.maxWidth}>
          <MobileFeatured {...props} />
        </Responsive>
        <Responsive minWidth={Responsive.onlyTablet.maxWidth}>
          <DesktopFeatured {...props} />
        </Responsive>
      </Feature>
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

function Layout(props) {
  return (
    <Container as={Segment.Group} fluid>
      <Segment basic>
        <Navbar />
      </Segment>
      <Segment as={NoPadding} basic>
        <Splash />
      </Segment>
      <Segment as={NoSidePadding} color="blue" secondary>
        <Shops />
      </Segment>
      <Segment as={NoSidePadding} color="blue" tertiary>
        <Pieces />
      </Segment>
      <Segment as={NoSidePadding} color="blue" secondary>
        <Brands />
      </Segment>
    </Container>
  );
}

export default Layout;

// Styling
const HamburgerButton = styled.div`
  display: inline !important;
  text-align: right !important;
`;

const GetStarted = styled.div`
  button {
    letter-spacing: 0.33rem !important;
    text-transform: uppercase !important;
  }
`;

const Centered = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Splasher = styled(Centered)`min-height: 60vh !important;`;

const NoPadding = styled.div`padding: 0 !important;`;

const NoSidePadding = styled.div`
  padding-left: 0 !important;
  padding-right: 0 !important;
`;

const Tagline = styled.div`font-size: 3rem !important;`;

const Subtagline = styled.div`font-size: 1.5rem !important;`;

const Ghost = styled.div`background: rgba(255, 255, 255, 0.5) !important;`;

const Emphasized = styled.em`color: #2185d0 !important;`;

const GimmeSomeSpace = styled.div`padding-left: 3rem !important;`;

const Feature = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh !important;

  h1 {
    font-size: 3rem !important;
    letter-spacing: 0.33rem !important;
    text-transform: uppercase !important;
  }

  .description {
    font-size: 1.5rem !important;
    line-height: 1.75rem !important;
  }

  button {
    margin-top: 1.5rem !important;
    letter-spacing: 0.33rem !important;
    text-transform: uppercase !important;
    background: #2185d0 !important;
    color: white !important;
  }
`;
