import React, { Component } from "react";
import { connect } from "react-redux";
import { Segment } from "semantic-ui-react";

import config from "../../config";
import withPageHeader from "../../components/withPageHeader";

class Verify extends Component {
  render() {
    return <p>Verify</p>;
  }
}

export default connect(
  state => ({
    id: state.router.location.pathname.split("/")[2],
    verificationCode: state.router.location.pathname.split("/")[3]
  }),
  null
)(withPageHeader(config.pageHeaders.verify, Verify));
