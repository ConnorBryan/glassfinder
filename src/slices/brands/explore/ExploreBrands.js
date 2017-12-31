import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Button,
  Card,
  Icon,
  Image,
  Segment,
  Menu,
  Loader,
  Header
} from "semantic-ui-react";
import styled from "styled-components";
import Aux from "react-aux";

import config from "../../../config";
import withPageHeader from "../../../components/withPageHeader";
import {
  fetchBrands,
  regressBrandsPage,
  advanceBrandsPage
} from "../redux/actions";

function BrandCard(props) {
  return (
    <Card color={config.color}>
      <Image src={props.image} />
      <Card.Content>
        <Card.Header as="h3" className="fancy">
          {props.name}
        </Card.Header>
        <Card.Description>{props.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Card.Description>
          <Icon name="map pin" /> From {props.from}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button as="a" href="https://www.google.com/" className="fancy" fluid>
          <Icon name="globe" /> Visit this brand
        </Button>
      </Card.Content>
      <Card.Content extra>
        <Button className="fancy" primary fluid>
          <Icon name="download" /> Download catalog
        </Button>
      </Card.Content>
    </Card>
  );
}

class ExploreBrands extends Component {
  static propTypes = {
    brands: PropTypes.array.isRequired,
    fetchBrands: PropTypes.func.isRequired
  };

  static defaultProps = {
    brands: []
  };

  componentDidMount() {
    this.fetchBrands();
  }

  fetchBrands = () => {
    const { brands, fetchBrands } = this.props;

    if (brands.length === 0) fetchBrands();
  };

  render() {
    const {
      page,
      totalPages,
      brands,
      fetching,
      fetchBrands,
      regress,
      advance
    } = this.props;

    const Transporter = () => (
      <Menu attached="bottom" inverted>
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
        <Transporter />
        {fetching ? (
          <Segment attached="bottom" textAlign="center">
            <Loader active inline size="huge">
              Loading...
            </Loader>
          </Segment>
        ) : (
          <Segment attached="bottom" clearing>
            {brands.length > 0 ? (
              <Card.Group stackable itemsPerRow={3}>
                {brands.map(brand => <BrandCard key={brand.key} {...brand} />)}
              </Card.Group>
            ) : (
              <Aux>
                <Header as="h3">
                  <Icon name="warning sign" /> There were no brands to display.{" "}
                </Header>
                <Button
                  as={GimmeSomeSpace}
                  onClick={() =>
                    fetchBrands(page, config.arbitraryWaitForTryingAgain)}
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
    page: state.brands.page,
    totalPages: state.brands.totalPages,
    brands: state.brands.brands,
    fetching: state.brands.fetching
  }),
  dispatch => ({
    fetchBrands: (page, artificialWait) =>
      dispatch(fetchBrands(page, artificialWait)),
    regress: () => dispatch(regressBrandsPage()),
    advance: () => dispatch(advanceBrandsPage())
  })
)(withPageHeader(config.pageHeaders.exploreBrands, ExploreBrands));

/* Styling */

const GimmeSomeSpace = styled.div`margin-top: 2rem;`;
