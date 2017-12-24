import React from "react";
import { Grid } from "semantic-ui-react";

import config from "../../../config";
import withPageHeader from "../../../providers/withPageHeader";
import PieceViewer from "../../../components/PieceViewer";
import ShopCard from "../components/ShopCard";

function ShopDetail(props) {
  return (
    <Grid celled divided container>
      <Grid.Row>
        <Grid.Column width={6}>
          <ShopCard fluid {...config.shops[0]} />
        </Grid.Column>
        <Grid.Column width={10}>
          <PieceViewer pieces={config.shops[0].pieces} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default withPageHeader(config.pageHeaders.shopDetail, ShopDetail);
