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
  state = {
    markers: [],
    allBrands: [],
    shopToBrands: {},
    filteredBrand: null
  };

  componentDidMount() {
    window.google.maps ? this.initMap() : (window.initMap = this.initMap);
    this.loadAllBrands();
    this.loadShopToBrands();
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

  loadMarkers = async () => {
    const { history } = this.props;
    const markers = await API.fetchMapMarkers();
    const finalMarkers = markers.map(({ lat, lng, id }) => {
      const marker = new window.google.maps.Marker({
        id,
        position: { lat, lng }
      });

      marker.addListener("click", function() {
        history.push(`/shops/${this.id}`);
      });

      return marker;
    });

    this.setState({ markers: finalMarkers }, this.addMarkersToMap);
  };

  loadAllBrands = async () => {
    const allBrands = await API.retrieveAllBrands();

    this.setState({ allBrands });
  };

  loadShopToBrands = async () => {
    const shopToBrands = await API.getAllShopToBrands();

    this.setState({ shopToBrands });
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

  handleFilteredBrandChange = ({ target: { value: filteredBrand } }) =>
    this.setState(
      { filteredBrand: parseInt(filteredBrand) === -1 ? null : filteredBrand },
      this.addMarkersToMap
    );

  addMarkersToMap = () => {
    const { markers, filteredBrand, shopToBrands } = this.state;

    this.clearMarkersFromMap();

    markers.forEach(marker => {
      if (filteredBrand) {
        const shop = shopToBrands[marker.id.toString()];

        if (Array.isArray(shop) && shop.includes(+filteredBrand)) {
          marker.setMap(this.map);
        }
      } else {
        marker.setMap(this.map);
      }
    });
  };

  clearMarkersFromMap = () => {
    const { markers } = this.state;

    markers.forEach(marker => marker.setMap(null));
  };

  render() {
    const { allBrands, filteredBrand } = this.state;

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
        <Container>
          <select name="filterBrand" onChange={this.handleFilteredBrandChange}>
            <option name="filterBrand" value={-1}>
              -- Select a brand to filter the map pins --
            </option>
            {allBrands.map(brand => (
              <option name="filterBrand" value={brand.id}>
                {brand.name}
              </option>
            ))}
          </select>
        </Container>
      </Styles>
    );
  }
}

export default withRouter(ShopMap);
