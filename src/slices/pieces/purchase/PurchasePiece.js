import React from "react";

import config from "../../../config";
import withPageHeader from "../../../atomic/withPageHeader";

function PurchasePiece(props) {
  return <div>PurchasePiece</div>;
}

export default withPageHeader(config.pageHeaders.purchasePiece, PurchasePiece);
