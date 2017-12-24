import { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { hideSidebar } from "../../redux/actions";

class SidebarDaemon extends Component {
  componentDidUpdate(prevProps) {
    const { hideSidebar, router } = this.props;

    if (router.location !== prevProps.location) {
      hideSidebar();
    }
  }

  render() {
    return this.props.children;
  }
}

SidebarDaemon.propTypes = {
  router: PropTypes.object.isRequired
};

export default connect(
  state => ({ router: state.router }),
  dispatch => ({
    hideSidebar: () => dispatch(hideSidebar())
  })
)(SidebarDaemon);
