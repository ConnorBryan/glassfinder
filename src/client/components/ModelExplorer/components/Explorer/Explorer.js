import React, { Component } from "react";
import { Container, Segment, Grid } from "semantic-ui-react";
import styled from "styled-components";

const Styles = styled.div`
  .Explorer {
    min-width: 40vw !important;
    max-width: 40vw !important;
    min-height: 80vh !important;
    max-height: 80vh !important;
    overflow: scroll;
    border: 1px solid white !important;
  }
`;

function Explorer({ renderItems, resource, models }) {
  return (
    <Styles>
      <Segment className="Explorer" attached="bottom" inverted>
        {renderItems(models)}
      </Segment>
    </Styles>
  );
}

export default Explorer;
