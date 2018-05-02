import React, { Component } from "react";
import { Formik, Field } from "formik";
import { Container, Loader, Segment } from "semantic-ui-react";
import styled from "styled-components";

import API from "../../../services";
import InputDropdown from "../../../components/InputDropdown";
import { InputWithDropdown } from "../_UploadPiece";

const Styles = styled.div`
  color: white;

  h2 {
    text-transform: uppercase;
    letter-spacing: 0.2rem;
  }

  .dropdown-segment {
    margin: 0 auto !important;
    margin-bottom: 3rem !important;
    padding: 2rem !important;
    font-size: 1.2rem !important;
    border: 1px solid #555 !important;
    max-width: 60vw;

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

    await API.associateShopWithBrand(id, value);

    window.location.reload();
  };

  handleDissociateBrandChange = async (value, label) => {
    const {
      account: {
        link: { id }
      }
    } = this.props;

    if (!value) return;

    await API.disassociateShopWithBrand(id, value);

    window.location.reload();
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
        <Container>
          <Segment className="dropdown-segment" inverted>
            <h2>Associate with a brand</h2>
            <p>
              This dropdown contains a list of all brands on Glassfinder. Select
              a brand that your shop carries to ensure customers can find you on
              the Shop view.
            </p>
            <InputDropdown
              placeholder="Enter a brand to associate with."
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
              placeholder="Enter a brand to dissociate with."
              minimumCharactersForDropdown={0}
              service={associatedBrandService}
              hideIfEmptyCollection
              emptyCollectionMessage="Your shop has no associated brands."
              onSubmit={this.handleDissociateBrandChange}
            />
          </Segment>
        </Container>
      </Styles>
    );
  }
}
