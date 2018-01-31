import React from "react";
import { Container, Responsive } from "semantic-ui-react";

import MobileFeatured from "./Featured.mobile";
import DesktopFeatured from "./Featured.desktop";

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

export default Featured;
