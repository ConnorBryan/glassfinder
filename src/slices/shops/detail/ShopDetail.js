import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Loader } from "semantic-ui-react";
import styled from "styled-components";

import config from "../../../config";
import { NoPadding } from "../../../styled";
import withPageHeader from "../../../components/withPageHeader";
import PieceViewer from "../../../components/PieceViewer";
import { fetchShop, fetchPieces } from "../redux/actions";
import ShopCard from "../components/ShopCard";

class ShopDetail extends Component {
  componentDidMount() {
    this.fetchShop();
    this.fetchPieces();
  }

  fetchShop = () => {
    const { activePathname, shop, fetchShop } = this.props;
    const id = +activePathname.split("/")[2];

    if (!shop || shop.id !== id) fetchShop(id);
  };

  fetchPieces = () => {
    const { activePathname, shop, fetchPieces } = this.props;
    const id = +activePathname.split("/")[2];

    if (!shop || shop.id !== id) fetchPieces(id);
  };

  render() {
    const { shop, fetching, pieces } = this.props;

    return (
      <Grid celled divided container>
        {fetching ? (
          <Grid.Row>
            <Grid.Column width={16} textAlign="center">
              <Loader inline active size="huge">
                Loading...
              </Loader>
            </Grid.Column>
          </Grid.Row>
        ) : (
          <Grid.Row>
            <Grid.Column
              as={Flex}
              mobile={16}
              tablet={16}
              computer={6}
              largeScreen={6}
              widescreen={6}
            >
              <ShopCard fluid mapLinked {...shop} />
            </Grid.Column>
            <Grid.Column
              as={NoPadding}
              mobile={16}
              tablet={16}
              computer={10}
              largeScreen={10}
              widescreen={10}
            >
              <PieceViewer pieces={pieces} />
            </Grid.Column>
          </Grid.Row>
        )}
      </Grid>
    );
  }
}

export default connect(
  state => ({
    activePathname: state.router.location.pathname,
    shop: state.shops.shop,
    fetching: state.shops.fetching,
    pieces: state.shops.shop
      ? state.shops.pieceMap[state.shops.shop.id] || []
      : []
  }),
  dispatch => ({
    fetchShop: id => dispatch(fetchShop(id)),
    fetchPieces: id => dispatch(fetchPieces(id))
  })
)(withPageHeader(config.pageHeaders.shopDetail, ShopDetail));

/* Styling */

export const Flex = styled(NoPadding)`
  display: flex !important;
  border: 1px solid black !important;
`;
