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
import styled from "styled-components";
import { Parallax } from "react-parallax";

import API from "../../services";
import Navbar from "../../components/Navbar";
import Splash from "../../components/Splash";
import FeaturedSet from "../../components/FeaturedSet";
import ModelViewer from "../../components/ModelViewer";

import { ShopViewer, ArtistViewer, BrandViewer } from "../../features";

// Layout

function Layout(props) {
  const Styles = styled.div`
    .segment.group > .segment:first-child {
      padding: 0 !important;
    }
  `;

  return (
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
  );
}

export default Layout;
