import React, { Component } from "react";
import { connect } from "react-redux";
import { Loader } from "semantic-ui-react";

import config from "../../../../config";
import withPageHeader from "../../../../components/withPageHeader";
import { fetchMyPieces } from "../../redux/actions";

class ViewMyPieces extends Component {
  componentDidMount() {
    const { myPieces, fetchMyPieces } = this.props;

    if (!myPieces) fetchMyPieces();
  }

  render() {
    const { myPieces } = this.props;

    if (!myPieces) {
      return <Loader active>Loading your pieces...</Loader>;
    }

    return <p>Yo</p>;
  }
}

export default connect(
  state => ({
    myPieces: state.account ? state.account.pieces : null
  }),
  dispatch => ({
    fetchMyPieces: () => dispatch(fetchMyPieces())
  })
)(withPageHeader(config.pageHeaders.viewMyPieces, ViewMyPieces));
