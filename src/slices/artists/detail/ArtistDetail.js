import React from "react";

import config from "../../../config";
import withPageHeader from "../../../providers/withPageHeader";

function ArtistDetail(props) {
  return <div>ArtistDetail</div>;
}

export default withPageHeader(config.pageHeaders.artistDetail, ArtistDetail);
