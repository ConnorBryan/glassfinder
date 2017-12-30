import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Button,
  Card,
  Icon,
  Segment,
  Loader,
  Menu,
  Header
} from "semantic-ui-react";
import styled from "styled-components";
import Aux from "react-aux";

import config from "../../../config";
import withPageHeader from "../../../components/withPageHeader";
import {
  fetchShops,
  regressShopsPage,
  advanceShopsPage
} from "../redux/actions";
import Map from "../components/Map";
import ShopCard from "../components/ShopCard";

class ExploreShops extends Component {
  static propTypes = {
    shops: PropTypes.array.isRequired,
    fetchShops: PropTypes.func.isRequired
  };

  static defaultProps = {
    shops: []
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
      fetchShops,
      regress,
      advance
    } = this.props;

    const Transporter = () => (
      <Menu attached="bottom" inverted>
        <Menu.Item className="fancy" onClick={() => {}}>
          <Icon name="map pin" /> Find my location
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item
            icon="chevron left"
            onClick={regress}
            disabled={page === 0}
          />
          <Menu.Item>
            <em>
              Viewing page {page + 1} of {totalPages < 1 ? 1 : totalPages}.
            </em>
          </Menu.Item>
          <Menu.Item
            icon="chevron right"
            onClick={advance}
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
          <Segment attached="bottom" clearing>
            {shops.length > 0 ? (
              <Card.Group stackable itemsPerRow={3}>
                {shops.map(shop => (
                  <ShopCard key={shop.name} mapLinked linked {...shop} />
                ))}
              </Card.Group>
            ) : (
              <Aux>
                <Header as="h3">
                  <Icon name="warning sign" /> There were no shops to display.{" "}
                </Header>
                <Button
                  as={GimmeSomeSpace}
                  onClick={() =>
                    fetchShops(page, config.arbitraryWaitForTryingAgain)}
                  primary
                  floated="right"
                  className="fancy"
                  content="Try again"
                  icon="refresh"
                />
              </Aux>
            )}
          </Segment>
        )}
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
    fetchShops: (page, artificialWait) =>
      dispatch(fetchShops(page, artificialWait)),
    regress: () => dispatch(regressShopsPage()),
    advance: () => dispatch(advanceShopsPage())
  })
)(withPageHeader(config.pageHeaders.exploreShops, ExploreShops));

/* Styling */

const GimmeSomeSpace = styled.div`margin-top: 2rem;`;
