import React from "react";

import config from "../../config";
import withPageHeader from "../../components/withPageHeader";

function TermsAndConditions(props) {
  return <div>Terms and Conditions</div>;
}

TermsAndConditions.propTypes = {};

export default withPageHeader(
  config.pageHeaders.termsAndConditions,
  TermsAndConditions
);
