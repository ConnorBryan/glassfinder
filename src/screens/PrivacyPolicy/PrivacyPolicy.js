import React from "react";
import { Item, Segment } from "semantic-ui-react";

import config from "../../config";
import withPageHeader from "../../atomic/withPageHeader";

function PrivacyPolicy(props) {
  return (
    <div>Privacy Policy</div>
  );
}

PrivacyPolicy.propTypes = {};

export default withPageHeader(config.pageHeaders.privacyPolicy, PrivacyPolicy);
