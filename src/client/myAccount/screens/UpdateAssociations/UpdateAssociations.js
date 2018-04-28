import React, { Component } from "react";
import { Formik, Field } from "formik";
import { Loader, Segment } from "semantic-ui-react";
import styled from "styled-components";

import API from "../../../services";
import InputDropdown from "../../../components/InputDropdown";
import { InputWithDropdown } from "../_UploadPiece";

const BRAND_ID_TO_NAME = {};

const Styles = styled.div`
  color: white;

  h2 {
    text-transform: uppercase;
    letter-spacing: 0.2rem;
  }

  .dropdown-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .dropdown-segment {
    margin: 0 !important;
    padding: 2rem !important;
    max-width: 50rem !important;
    font-size: 1.2rem !important;

    p {
      height: 5rem !important;
    }
  }
`;

export default class UpdateAssociations extends Component {
  handleAssociateBrandChange = async (value, label) => {
    const {
      account: {
        link: { id }
      }
    } = this.props;

    if (window.confirm(`Associate with ${label}?`)) {
      const association = await API.associateShopWithBrand(id, value);

      window.location.reload();
    }
  };

  handleDissociateBrandChange = async (value, label) => {
    const {
      account: {
        link: { id }
      }
    } = this.props;

    if (!value) return;

    if (window.confirm(`Disassociate with ${label}?`)) {
      await API.disassociateShopWithBrand(id, value);

      window.location.reload();
    }
  };

  render() {
    const {
      account: {
        link: { id }
      }
    } = this.props;
    const associatedBrandService = API.getShopToBrandAssociations.bind(
      null,
      id
    );

    return (
      <Styles>
        <div className="dropdown-wrapper">
          <Segment className="dropdown-segment" inverted>
            <h2>Associate with a brand</h2>
            <p>
              This dropdown contains a list of all brands on Glassfinder. Select
              a brand that your shop carries to ensure customers can find you on
              the Shop view.
            </p>
            <InputDropdown
              placeholder="Enter a brand to associate with it."
              minimumCharactersForDropdown={0}
              service={API.retrieveAllBrands}
              onSubmit={this.handleAssociateBrandChange}
            />
          </Segment>
          <Segment className="dropdown-segment" inverted>
            <h2>Associated brands</h2>
            <p>
              This dropdown contains a list of all the brands your shop is
              associated with. Select a brand from this list to remove that
              association and thereby prevent your shop from showing up on the
              map when it is filtered by that brand.
            </p>
            <InputDropdown
              placeholder="Enter a brand to dissociate with it."
              minimumCharactersForDropdown={0}
              service={associatedBrandService}
              onSubmit={this.handleDissociateBrandChange}
            />
          </Segment>
        </div>
      </Styles>
    );
  }
}
