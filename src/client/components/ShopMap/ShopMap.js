import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Container, Segment, Menu, Button, Icon } from "semantic-ui-react";
import styled from "styled-components";
import Aux from "react-aux";

import { retrieveFromCache, removeFromCache, updateCache } from "../../../util";
import API from "../../services";
import InputDropdown from "../InputDropdown";
import { filter } from "minimatch";

const Styles = styled.div`
  .map-wrapper,
  #map {
    min-height: 50vh !important;
  }

  .map-wrapper {
    min-width: 450px;
  }

  .item {
    text-transform: uppercase !important;
    letter-spacing: 0.25rem !important;
  }

  .menu {
    border: 1px solid #555 !important;
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
    shopToBrands: {},
    filteredBrand: null,
    filteredBrandLabels: {}
  };

  componentDidMount() {
    window.google.maps ? this.initMap() : (window.initMap = this.initMap);
    this.loadShopToBrands();
  }

  componentDidUpdate() {
    const { filteredBrand, filteredBrandLabels } = this.state;
    const label = filteredBrandLabels[filteredBrand];

    console.log("CDU Label", label);

    if (filteredBrand !== null && !label) {
      this.translateIdToLabel(filteredBrand);
    }
  }

  initMap = async () => {
    const map = document.getElementById("map");
    const defaultCenter = { lat: -37.774929, lng: -122.419416 };

    this.map = new window.google.maps.Map(map, {
      zoom: 3,
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

  loadShopToBrands = async () => {
    const shopToBrands = await API.getAllShopToBrands();

    this.setState({ shopToBrands });
  };

  translateIdToLabel = async id => {
    const { filteredBrandLabels } = this.state;

    let label = filteredBrandLabels[id];

    if (!label) {
      const brand = await API.getBrand(id);

      label = brand.name;

      this.setState({
        filteredBrandLabels: { ...filteredBrandLabels, [id]: label }
      });
    }

    return label || "";
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

  clearFilteredBrand = () =>
    this.setState({ filteredBrand: null }, this.addMarkersToMap);

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
    const { filteredBrand, filteredBrandLabels } = this.state;
    const filteredBrandLabel = filteredBrandLabels[filteredBrand];

    return (
      <Styles>
        <Container style={{ display: "flex", alignItems: "center" }}>
          <div className="filter-input">
            <InputDropdown
              inputLabel="Filter map pins by brand"
              inputDescription="Select a brand from this dropdown to only display shops that carry that brand."
              placeholder="Enter a brand to filter the map."
              minimumCharactersForDropdown={0}
              width="40rem"
              service={API.retrieveAllBrands}
              onSubmit={this.handleFilteredBrandChange}
              additionalClearButtonFunctionality={this.clearFilteredBrand}
            />
            <Segment
              style={{
                textAlign: "center",
                fontSize: "1.3rem",
                marginTop: "3rem",
                border: "1px solid #555"
              }}
              inverted
            >
              {filteredBrand === null ? (
                <em>Showing all shops.</em>
              ) : (
                <Aux>
                  <em>
                    Showing shops that carry products by{" "}
                    <strong>{filteredBrandLabel}</strong>.
                  </em>
                  <br />
                  <Button
                    style={{ marginTop: "1.5rem" }}
                    onClick={this.clearFilteredBrand}
                    fluid
                    secondary
                  >
                    <Icon name="close" /> Clear
                  </Button>
                </Aux>
              )}
            </Segment>
          </div>
          <div>
            <div className="map-wrapper">
              <Segment attached="top" id="map" />
              <Menu
                style={{ textAlign: "center" }}
                attached="bottom"
                inverted
                vertical
                fluid
              >
                <Menu.Item
                  content="Find my location"
                  onClick={this.findMyLocation}
                />
              </Menu>
            </div>
          </div>
        </Container>
      </Styles>
    );
  }
}

export default withRouter(ShopMap);
