import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Menu,
  Card,
  Segment,
  Loader,
  Header,
  Icon,
  Button
} from "semantic-ui-react";
import styled from "styled-components";
import Aux from "react-aux";

import config from "../../../config";
import withPageHeader from "../../../components/withPageHeader";
import {
  fetchPieces,
  regressPiecesPage,
  advancePiecesPage
} from "../redux/actions";
import PieceCard from "../../../components/PieceCard";

class ExplorePieces extends Component {
  static propTypes = {
    pieces: PropTypes.array.isRequired,
    fetchPieces: PropTypes.func.isRequired
  };

  static defaultProps = {
    pieces: []
  };

  componentDidMount() {
    this.fetchPieces();
  }

  fetchPieces = () => {
    const { pieces, fetchPieces } = this.props;

    if (pieces.length === 0) fetchPieces();
  };

  render() {
    const {
      page,
      totalPages,
      pieces,
      fetching,
      fetchPieces,
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
            <Loader active={true} inline size="huge">
              Loading...
            </Loader>
          </Segment>
        ) : (
          <Segment attached="bottom" clearing>
            {pieces.length > 0 ? (
              <Card.Group stackable itemsPerRow={3}>
                {pieces.map(piece => (
                  <PieceCard
                    key={piece.key}
                    linked
                    artistLinked
                    shopLinked
                    purchaseLinked
                    {...piece}
                  />
                ))}
              </Card.Group>
            ) : (
              <Aux>
                <Header as="h3">
                  <Icon name="warning sign" /> There were no pieces to display.{" "}
                </Header>
                <Button
                  as={GimmeSomeSpace}
                  onClick={() =>
                    fetchPieces(page, config.arbitraryWaitForTryingAgain)}
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
    page: state.pieces.page,
    totalPages: state.pieces.totalPages,
    pieces: state.pieces.pieces,
    fetching: state.pieces.fetching
  }),
  dispatch => ({
    fetchPieces: (page, artificialWait) =>
      dispatch(fetchPieces(page, artificialWait)),
    regress: () => dispatch(regressPiecesPage()),
    advance: () => dispatch(advancePiecesPage())
  })
)(withPageHeader(config.pageHeaders.explorePieces, ExplorePieces));

/* Styling */

const GimmeSomeSpace = styled.div`margin-top: 2rem;`;
