import React from "react";

import config from "../../../config";
import withPageHeader from "../../../atomic/withPageHeader";

function MyAccount(props) {
  return <div>My Account</div>;
}

export default withPageHeader(config.pageHeaders.myAccount, MyAccount);
