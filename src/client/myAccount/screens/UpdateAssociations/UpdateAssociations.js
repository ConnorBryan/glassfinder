import React, { Component } from "react";
import { Formik, Field } from "formik";
import { Loader } from "semantic-ui-react";
import styled from "styled-components";

import API from "../../../services";
import { InputWithDropdown } from "../_UploadPiece";

const BRAND_ID_TO_NAME = {};

const Styles = styled.div`
  color: white;
`;

export default class UpdateAssociations extends Component {
  state = {
    loading: true,
    associatedBrands: [],
    allBrands: []
  };

  componentDidMount() {
    this.setAssociatedBrands();
    this.setAllBrands();
  }

  setAssociatedBrands = async () => {
    const {
      account: {
        link: { id }
      }
    } = this.props;

    const associatedBrands = await API.getShopToBrandAssociations(id);

    this.setState({
      loading: false,
      associatedBrands
    });
  };

  setAllBrands = async () => {
    const allBrands = await API.retrieveAllBrands();

    this.setState({ allBrands });
  };

  handleAssociateBrandChange = async ({ target: { value } }) => {
    const {
      account: {
        link: { id }
      }
    } = this.props;

    console.log("Doing an action for Shop#", id);

    if (window.confirm(`Associate with ${BRAND_ID_TO_NAME[value]}?`)) {
      const association = await API.associateShopWithBrand(id, value);

      console.log(association);
    }
  };

  render() {
    const { loading, associatedBrands, allBrands } = this.state;

    if (loading) return <Loader>Loading...</Loader>;

    return (
      <Styles>
        <p>Associated brands</p>
        <select name="brand">
          {associatedBrands.map((brand, index) => (
            <option key={index} name="brand" value={brand.id}>
              {brand.name}
            </option>
          ))}
        </select>

        <p>Associate with a brand</p>
        <select
          name="associateBrand"
          onChange={this.handleAssociateBrandChange}
        >
          <option name="associateBrand" value={null}>
            Select a brand
          </option>
          {allBrands.map((brand, index) => {
            // Use dictionary for handling the change.
            BRAND_ID_TO_NAME[brand.id] = brand.name;

            return (
              <option key={index} name="associateBrand" value={brand.id}>
                {brand.name}
              </option>
            );
          })}
        </select>
      </Styles>
    );
  }
}
