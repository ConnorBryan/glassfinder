import React, { Component } from "react";
import PropTypes from "prop-types";
import { Responsive, Segment, Menu, Icon, Grid } from "semantic-ui-react";
import styled from "styled-components";
import Aux from "react-aux";

import config from "../../config";
import { NoPadding } from "../../styled";
import PieceCard from "../../components/PieceCard";

function PieceViewerMenu(props) {
  return (
    <Aux>
      <Menu attached="top">
        <Menu.Item header className="fancy" onClick={props.reset}>
          <Icon name={config.iconSet.piece} /> Piece Viewer
        </Menu.Item>
        <Responsive
          as={Menu.Item}
          minWidth={Responsive.onlyTablet.maxWidth}
          position="right"
        >
          <em>
            Viewing {props.currentPiece} of {props.totalPieces}
          </em>
        </Responsive>
      </Menu>
      <Responsive
        as={Menu}
        attached="bottom"
        minWidth={Responsive.onlyMobile.minWidth}
        maxWidth={Responsive.onlyTablet.maxWidth}
        widths={3}
      >
        <Menu.Item
          icon
          onClick={props.regress}
          disabled={props.regressDisabled}
        >
          <Icon name="chevron left" />
        </Menu.Item>
        <Menu.Item icon>
          {props.currentPiece} / {props.totalPieces}
        </Menu.Item>
        <Menu.Item
          icon
          onClick={props.advance}
          disabled={props.advanceDisabled}
        >
          <Icon name="chevron right" />
        </Menu.Item>
      </Responsive>
    </Aux>
  );
}

PieceViewerMenu.propTypes = {
  reset: PropTypes.func.isRequired,
  currentPiece: PropTypes.number.isRequired,
  totalPieces: PropTypes.number.isRequired,
  regress: PropTypes.func,
  regressDisabled: PropTypes.bool,
  advance: PropTypes.func,
  advanceDisabled: PropTypes.bool
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
      <Segment as={NoPadding} basic compact>
        <PieceViewerMenu
          reset={this.resetCurrentPiece}
          currentPiece={currentPieceIndex + 1}
          totalPieces={pieces.length}
          regress={this.regressCurrentPiece}
          regressDisabled={leftNavigationDisabled}
          advance={this.advanceCurrentPiece}
          advanceDisabled={rightNavigationDisabled}
        />
        <Segment attached="bottom">
          <Grid>
            <Grid.Row>
              <Responsive
                as={Grid.Column}
                minWidth={Responsive.onlyTablet.maxWidth}
                computer={3}
                largeScreen={3}
                widescreen={3}
                stretched
              >
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
              </Responsive>
              <Grid.Column
                mobile={16}
                tablet={16}
                computer={10}
                largeScreen={10}
                widescreen={10}
              >
                <PieceCard fluid linked purchaseLinked {...currentPiece} />
              </Grid.Column>
              <Responsive
                as={Grid.Column}
                minWidth={Responsive.onlyTablet.maxWidth}
                computer={3}
                largeScreen={3}
                widescreen={3}
                stretched
              >
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
              </Responsive>
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
