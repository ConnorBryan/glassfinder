import React from "react";

import config from "../../../config";
import withPageHeader from "../../../components/withPageHeader";

function PieceDetail(props) {
  return <div>PieceDetail</div>;
}

export default withPageHeader(config.pageHeaders.pieceDetail, PieceDetail);
