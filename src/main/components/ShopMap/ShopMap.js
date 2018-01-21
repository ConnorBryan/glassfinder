import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Container, Segment, Menu } from "semantic-ui-react";
import styled from "styled-components";

import { retrieveFromCache } from "../../util";

const Styles = styled.div`
  #map {
    min-height: 50vh !important;
  }

  .item {
    text-transform: uppercase !important;
    letter-spacing: 0.25rem !important;
  }
`;

class ShopMap extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.google.maps ? this.initMap() : (window.initMap = this.initMap);
  }

  componentWillReceiveProps(nextProps) {
    const { shops: currentShops } = this.props;
    const { shops: nextShops } = nextProps;

    if (nextShops.length !== currentShops.length) {
      this.loadMarkersFromProps();
    }
  }

  initMap = async () => {
    const map = document.getElementById("map");
    const defaultCenter = { lat: -37.774929, lng: -122.419416 };

    this.map = new window.google.maps.Map(map, {
      zoom: 4,
      center: defaultCenter
    });

    this.loadMarkersFromCache();
    this.findMyLocation();
  };

  addMarkerToMap = ({ lat, lng, id }) => {
    const { history } = this.props;

    const marker = new window.google.maps.Marker({
      id,
      position: { lat, lng },
      map: this.map
    });

    marker.addListener("click", function() {
      history.push(`/shops/${this.id}`);
    });

    return marker;
  };

  loadMarkersFromCache = () => {
    const shops = JSON.parse(retrieveFromCache("shops") || "[]").reduce(
      (prev, next) => [...prev, ...next],
      []
    );

    shops.forEach(shop => this.addMarkerToMap(shop));
  };

  loadMarkersFromProps = () => {
    const { shops } = this.props;

    shops.forEach(shop => this.addMarkerToMap(shop));
  };

  panToLocation = ({ coords: { latitude: lat, longitude: lng } }) => {
    this.map.panTo({ lat, lng });
  };

  displayError = e => {
    console.error("whoops", e);
  };

  findMyLocation = () => {
    navigator.geolocation.getCurrentPosition(
      this.panToLocation,
      this.displayError
    );
  };

  render() {
    return (
      <Styles>
        <Container>
          <Segment attached="top" id="map" />
          <Menu attached="bottom" widths={1}>
            <Menu.Item
              content="Find my location"
              icon="map pin"
              onClick={this.findMyLocation}
            />
          </Menu>
        </Container>
      </Styles>
    );
  }
}

export default withRouter(ShopMap);
