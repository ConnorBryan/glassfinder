import React from "react";

import config from "../../config";
import withPageHeader from "../../providers/withPageHeader";

function TermsAndConditions(props) {
  return <div>Terms and Conditions</div>;
}

TermsAndConditions.propTypes = {};

export default withPageHeader(
  config.pageHeaders.termsAndConditions,
  TermsAndConditions
);
