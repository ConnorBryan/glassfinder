import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Card, Segment, Loader } from "semantic-ui-react";

import config from "../../../config";
import withPageHeader from "../../../components/withPageHeader";
import { fetchShops } from "../redux/actions";
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
    const { shops: { shops }, fetchShops } = this.props;

    if (shops.length === 0) fetchShops();
  };

  render() {
    const { shops: { shops, fetching } } = this.props;

    return (
      <Segment.Group>
        <Segment attached="top">
          <Map />
        </Segment>
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
      </Segment.Group>
    );
  }
}

export default connect(
  state => ({
    shops: state.shops
  }),
  dispatch => ({
    fetchShops: () => dispatch(fetchShops())
  })
)(withPageHeader(config.pageHeaders.exploreShops, ExploreShops));
