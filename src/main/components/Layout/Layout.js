import React from "react";
import { Container, Segment } from "semantic-ui-react";
import styled from "styled-components";

import Navbar from "../../components/Navbar";
import Splash from "../../components/Splash";
import FeaturedSet from "../../components/FeaturedSet";

import { ShopViewer, ArtistViewer, BrandViewer } from "../../features";

function Layout() {
  const Styles = styled.div`
    .segments > .segment:first-of-type {
      padding: 0 !important;
    }
  `;

  return (
    <Styles>
      <Container fluid>
        <Segment basic>
          <Navbar />
        </Segment>
        <Segment.Group>
          <Segment basic>
            <Splash />
          </Segment>
          <FeaturedSet />
          <Segment tertiary>
            <ShopViewer />
          </Segment>
          <Segment secondary>
            <ArtistViewer />
          </Segment>
          <Segment tertiary>
            <BrandViewer />
          </Segment>
        </Segment.Group>
      </Container>
    </Styles>
  );
}

export default Layout;
