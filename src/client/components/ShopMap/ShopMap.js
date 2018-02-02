import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Container, Segment, Menu } from "semantic-ui-react";
import styled from "styled-components";

import { retrieveFromCache, removeFromCache, updateCache } from "../../../util";
import API from "../../services";

const Styles = styled.div`
  #map {
    min-height: 50vh !important;
  }

  .item {
    text-transform: uppercase !important;
    letter-spacing: 0.25rem !important;
  }

  .menu {
    border: 1px solid white !important;
  }
`;

class ShopMap extends Component {
  componentDidMount() {
    window.google.maps ? this.initMap() : (window.initMap = this.initMap);
  }

  initMap = async () => {
    const map = document.getElementById("map");
    const defaultCenter = { lat: -37.774929, lng: -122.419416 };

    this.map = new window.google.maps.Map(map, {
      zoom: 8,
      center: defaultCenter
    });

    this.loadMarkers();
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

  loadMarkers = async () => {
    let markers;

    const cachedMarkers = JSON.parse(retrieveFromCache("markers") || "[]");
    const markersExpiration =
      retrieveFromCache("markersExpiration") || String(new Date().getTime());
    const expired = new Date().getTime() - +markersExpiration >= 0;

    if (cachedMarkers.length > 0 && !expired) {
      markers = cachedMarkers;
    } else {
      removeFromCache("markers", "markersExpiration");

      markers = await API.fetchMapMarkers();

      this.cacheMarkers(markers);
    }

    markers.forEach(marker => this.addMarkerToMap(marker));
  };

  cacheMarkers = markers => {
    updateCache({
      markers: JSON.stringify(markers),
      markersExpiration: new Date().getTime() + 10000
    });
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
          <Menu attached="bottom" widths={1} inverted>
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
