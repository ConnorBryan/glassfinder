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

    if (window.confirm(`Associate with ${BRAND_ID_TO_NAME[value]}?`)) {
      const association = await API.associateShopWithBrand(id, value);

      window.location.reload();
    } else {
      this.associateSelect.value = "Select a brand to associate with it.";
    }
  };

  handleDisassociateBrandChange = async ({ target: { value } }) => {
    const {
      account: {
        link: { id }
      }
    } = this.props;

    if (!value) return;

    if (window.confirm(`Disassociate with ${BRAND_ID_TO_NAME[value]}?`)) {
      await API.disassociateShopWithBrand(id, value);

      window.location.reload();
    } else {
      this.dissociateSelect.value =
        "Select an associated brand to disassociate with it.";
    }
  };

  filter = brands => {
    const { associatedBrands } = this.state;
    const existingIds = associatedBrands.reduce((prev, next) => {
      return { ...prev, [next.id]: true };
    }, {});

    return brands.filter(brand => !existingIds[brand.id]);
  };

  render() {
    const { loading, associatedBrands, allBrands } = this.state;

    if (loading) return <Loader>Loading...</Loader>;

    return (
      <Styles>
        <p>Associated brands</p>
        <select
          ref={node => (this.dissociateSelect = node)}
          name="brand"
          onChange={this.handleDisassociateBrandChange}
        >
          <option name="brand" value={null}>
            Select an associated brand to disassociate with it.
          </option>
          {associatedBrands.map((brand, index) => {
            BRAND_ID_TO_NAME[brand.id] = brand.name;

            return (
              <option key={index} name="brand" value={brand.id}>
                {brand.name}
              </option>
            );
          })}
        </select>

        <p>Associate with a brand</p>
        <select
          ref={node => (this.associateSelect = node)}
          name="associateBrand"
          onChange={this.handleAssociateBrandChange}
        >
          <option name="associateBrand" value={null}>
            Select a brand to associate with it.
          </option>
          {this.filter(allBrands).map((brand, index) => {
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
