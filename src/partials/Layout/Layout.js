import React from "react";
import {
  Container,
  Segment,
  Menu,
  Button,
  Icon,
  Responsive,
  Image
} from "semantic-ui-react";
import styled from "styled-components";
import Aux from "react-aux";

function MobileNavbar(props) {
  return (
    <Menu widths={2} borderless secondary>
      <Menu.Item onClick={() => {}}>
        <Image src="https://placehold.it/150x30" />
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
        <Image src="https://placehold.it/300x40" />
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

function Layout(props) {
  return (
    <Container as={Segment.Group} fluid>
      <Segment attached="top" basic>
        <Navbar />
      </Segment>
      <Segment attached="bottom" basic />
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
