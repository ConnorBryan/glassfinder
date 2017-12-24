import React from "react";
import { Grid } from "semantic-ui-react";
import styled from "styled-components";

import config from "../../../config";
import { NoPadding } from "../../../styled";
import withPageHeader from "../../../providers/withPageHeader";
import PieceViewer from "../../../components/PieceViewer";
import ShopCard from "../components/ShopCard";

function ShopDetail(props) {
  return (
    <Grid celled divided container>
      <Grid.Row>
        <Grid.Column
          as={Flex}
          mobile={16}
          tablet={16}
          computer={6}
          largeScreen={6}
          widescreen={6}
        >
          <ShopCard fluid mapLinked {...config.shops[0]} />
        </Grid.Column>
        <Grid.Column
          as={NoPadding}
          mobile={16}
          tablet={16}
          computer={10}
          largeScreen={10}
          widescreen={10}
        >
          <PieceViewer pieces={config.shops[0].pieces} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default withPageHeader(config.pageHeaders.shopDetail, ShopDetail);

/* Styling */

const Flex = styled.div`display: flex !important;`;
