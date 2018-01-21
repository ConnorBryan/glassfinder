import React from "react";
import { Container, Responsive } from "semantic-ui-react";
import styled from "styled-components";

import MobileNavbar from "./Navbar.mobile";
import DesktopNavbar from "./Navbar.desktop";

const Styles = styled.div`
  .Navbar-wrapper {
    margin: 0 !important;
  }
`;

function Navbar(props) {
  return (
    <Styles>
      <Container className="Navbar-wrapper" fluid>
        <Responsive maxWidth={Responsive.onlyTablet.maxWidth}>
          <MobileNavbar {...props} />
        </Responsive>
        <Responsive minWidth={Responsive.onlyTablet.maxWidth}>
          <DesktopNavbar {...props} />
        </Responsive>
      </Container>
    </Styles>
  );
}

export default Navbar;
