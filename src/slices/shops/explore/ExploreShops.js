import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Card, Icon, Segment, Loader, Menu } from "semantic-ui-react";

import config from "../../../config";
import withPageHeader from "../../../components/withPageHeader";
import { fetchShops, regressShopPage, advanceShopPage } from "../redux/actions";
import Map from "../components/Map";
import ShopCard from "../components/ShopCard";

class ExploreShops extends Component {
  static propTypes = {
    shops: PropTypes.object.isRequired,
    fetchShops: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.fetchShops();
  }

  fetchShops = () => {
    const { shops, fetchShops } = this.props;

    if (shops.length === 0) fetchShops();
  };

  render() {
    const {
      page,
      totalPages,
      shops,
      fetching,
      regressShopPage,
      advanceShopPage
    } = this.props;

    const Transporter = () => (
      <Menu attached="bottom" inverted>
        <Menu.Item className="fancy" onClick={() => {}}>
          <Icon name="map pin" /> Find my location
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item
            icon="chevron left"
            onClick={regressShopPage}
            disabled={page === 0}
          />
          <Menu.Item>
            <em>
              Viewing page {page + 1} of {totalPages}.
            </em>
          </Menu.Item>
          <Menu.Item
            icon="chevron right"
            onClick={advanceShopPage}
            disabled={page + 1 >= totalPages}
          />
        </Menu.Menu>
      </Menu>
    );

    return (
      <Segment.Group>
        <Map />
        <Transporter />
        {fetching ? (
          <Segment attached="bottom" textAlign="center">
            <Loader active={true} inline size="huge">
              Loading...
            </Loader>
          </Segment>
        ) : (
          <Segment attached="bottom">
            <Card.Group stackable itemsPerRow={3}>
              {shops.map(shop => (
                <ShopCard key={shop.name} mapLinked linked {...shop} />
              ))}
            </Card.Group>
          </Segment>
        )}
        <Transporter />
      </Segment.Group>
    );
  }
}

export default connect(
  state => ({
    page: state.shops.page,
    totalPages: state.shops.totalPages,
    shops: state.shops.shops,
    fetching: state.shops.fetching
  }),
  dispatch => ({
    fetchShops: () => dispatch(fetchShops()),
    regressShopPage: () => dispatch(regressShopPage()),
    advanceShopPage: () => dispatch(advanceShopPage())
  })
)(withPageHeader(config.pageHeaders.exploreShops, ExploreShops));
