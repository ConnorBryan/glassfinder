import React from "react";
import { Container, Responsive } from "semantic-ui-react";

import MobileNavbar from "./Navbar.mobile";
import DesktopNavbar from "./Navbar.desktop";

function Navbar(props) {
  return (
    <Container fluid>
      <Responsive maxWidth={Responsive.onlyTablet.maxWidth}>
        <MobileNavbar {...props} />
      </Responsive>
      <Responsive minWidth={Responsive.onlyTablet.maxWidth}>
        <DesktopNavbar {...props} />
      </Responsive>
    </Container>
  );
}

export default Navbar;
