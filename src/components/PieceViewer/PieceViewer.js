import React, { Component } from "react";
import PropTypes from "prop-types";
import { Segment, Menu, Icon, Grid } from "semantic-ui-react";
import styled from "styled-components";

import config from "../../config";
import PieceCard from "../../components/PieceCard";

function PieceViewerMenu(props) {
  return (
    <Menu attached="top">
      <Menu.Item header className="fancy" onClick={props.reset}>
        <Icon name={config.iconSet.piece} /> Piece Viewer
      </Menu.Item>
      <Menu.Item position="right">
        <em>
          Viewing {props.currentPiece} of {props.totalPieces}
        </em>
      </Menu.Item>
    </Menu>
  );
}

PieceViewerMenu.propTypes = {
  reset: PropTypes.func.isRequired,
  currentPiece: PropTypes.number.isRequired,
  totalPieces: PropTypes.number.isRequired
};

function PieceViewerNavigation(props) {
  const color = props.disabled ? "grey" : "black";
  const as = props.disabled ? PerfectlyCentered : Hoverable;

  return (
    <Segment as={as} onClick={props.onClick} basic>
      <Icon name={props.icon} color={color} size="huge" />
    </Segment>
  );
}

PieceViewerNavigation.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  icon: PropTypes.string.isRequired
};

export default class PieceViewer extends Component {
  static propTypes = {
    pieces: PropTypes.array.isRequired
  };

  state = {
    currentPieceIndex: 0
  };

  switchCurrentPiece = index => this.setState({ currentPieceIndex: index });

  resetCurrentPiece = () => this.switchCurrentPiece(0);

  regressCurrentPiece = () =>
    this.setState(prevState => ({
      currentPieceIndex: prevState.currentPieceIndex - 1
    }));

  advanceCurrentPiece = () =>
    this.setState(prevState => ({
      currentPieceIndex: prevState.currentPieceIndex + 1
    }));

  render() {
    const { pieces } = this.props;
    const { currentPieceIndex } = this.state;

    const currentPiece = pieces[currentPieceIndex];
    const leftNavigationDisabled = !pieces[currentPieceIndex - 1];
    const rightNavigationDisabled = !pieces[currentPieceIndex + 1];

    return (
      <Segment basic compact>
        <PieceViewerMenu
          reset={this.resetCurrentPiece}
          currentPiece={currentPieceIndex + 1}
          totalPieces={pieces.length}
        />
        <Segment attached="bottom">
          <Grid>
            <Grid.Row>
              <Grid.Column stretched width={3}>
                <PieceViewerNavigation
                  icon="chevron left"
                  disabled={leftNavigationDisabled}
                  onClick={
                    !leftNavigationDisabled ? (
                      this.regressCurrentPiece
                    ) : (
                      undefined
                    )
                  }
                />
              </Grid.Column>
              <Grid.Column width={10}>
                <PieceCard fluid linked purchaseLinked {...currentPiece} />
              </Grid.Column>
              <Grid.Column stretched width={3}>
                <PieceViewerNavigation
                  icon="chevron right"
                  disabled={rightNavigationDisabled}
                  onClick={
                    !rightNavigationDisabled ? (
                      this.advanceCurrentPiece
                    ) : (
                      undefined
                    )
                  }
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Segment>
    );
  }
}

/* Styling */

const PerfectlyCentered = styled.div`
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
`;

const Hoverable = styled(PerfectlyCentered)`
  &:hover {
    background: rgba(0, 0, 0, 0.03) !important;
    cursor: pointer !important;
  }
`;
