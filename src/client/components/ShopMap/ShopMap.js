import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Container, Segment, Menu } from "semantic-ui-react";
import styled from "styled-components";

import { retrieveFromCache, removeFromCache, updateCache } from "../../../util";
import API from "../../services";
import InputDropdown from "../InputDropdown";

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

  .filter-input {
    margin: 0 !important;
    padding: 2rem !important;
    max-width: 50rem !important;
    font-size: 1.2rem !important;

    h2 {
      text-transform: uppercase;
      letter-spacing: 0.2rem;
    }
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

  handleFilteredBrandChange = filteredBrand =>
    this.setState(
      {
        filteredBrand: parseInt(filteredBrand, 10) === -1 ? null : filteredBrand
      },
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
        <div className="filter-input">
          <h2>Filter map pins by brand</h2>
          <p>
            Select a brand from this dropdown to only display shops that carry
            that brand.
          </p>
          <InputDropdown
            placeholder="Enter a brand to filter the map."
            minimumCharactersForDropdown={0}
            width="40rem"
            service={API.retrieveAllBrands}
            onSubmit={this.handleFilteredBrandChange}
          />
        </div>
      </Styles>
    );
  }
}

export default withRouter(ShopMap);
