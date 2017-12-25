import { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { hideSidebar } from "../../redux/actions";

class SidebarDaemon extends Component {
  componentDidUpdate(prevProps) {
    const { hideSidebar, router, sidebar } = this.props;

    if (sidebar && router.location !== prevProps.router.location) {
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
  state => ({ router: state.router, sidebar: state.sidebar }),
  dispatch => ({
    hideSidebar: () => dispatch(hideSidebar())
  })
)(SidebarDaemon);
