import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Loader } from "semantic-ui-react";
import styled from "styled-components";

import config from "../../../config";
import { NoPadding } from "../../../styled";
import withPageHeader from "../../../components/withPageHeader";
import PieceViewer from "../../../components/PieceViewer";
import { fetchShop } from "../redux/actions";
import ShopCard from "../components/ShopCard";

class ShopDetail extends Component {
  componentDidMount() {
    this.fetchShop();
  }

  fetchShop = () => {
    const {
      router: { location: { pathname } },
      shops: { shop },
      fetchShop
    } = this.props;
    const id = +pathname.split("/")[2];

    if (!shop || shop.id !== id) fetchShop(id);
  };

  render() {
    const { shops: { shop, fetching } } = this.props;

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
              {/*<PieceViewer pieces={config.shops[0].pieces} />*/}
            </Grid.Column>
          </Grid.Row>
        )}
      </Grid>
    );
  }
}

export default connect(
  state => ({
    router: state.router,
    shops: state.shops
  }),
  dispatch => ({
    fetchShop: id => dispatch(fetchShop(id))
  })
)(withPageHeader(config.pageHeaders.shopDetail, ShopDetail));

/* Styling */

export const Flex = styled(NoPadding)`
  display: flex !important;
  border: 1px solid black !important;
`;
