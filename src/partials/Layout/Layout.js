import React from "react";
import {
  Container,
  Segment,
  Menu,
  Button,
  Icon,
  Responsive,
  Image,
  Header
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

function Layout(props) {
  return (
    <Container as={Segment.Group} fluid>
      <Segment attached="top" basic>
        <Navbar />
      </Segment>
      <Segment as={NoPadding} attached="bottom" basic>
        <Splash />
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

const Splasher = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh !important;
`;

const NoPadding = styled.div`padding: 0 !important;`;

const Tagline = styled.div`font-size: 3rem !important;`;

const Subtagline = styled.div`font-size: 1.5rem !important;`;

const Ghost = styled.div`background: rgba(255, 255, 255, 0.5) !important;`;

const Emphasized = styled.em`color: #2185d0 !important;`;
