import { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { hideSidebar, hideWarning } from "../../redux/actions";

class SidebarDaemon extends Component {
  componentDidUpdate(prevProps) {
    const { hideSidebar, router, sidebar, warning } = this.props;

    const isNewLocation = router.location !== prevProps.router.location;

    if (isNewLocation) {
      sidebar && hideSidebar();
      warning && hideWarning();
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
  state => ({
    router: state.router,
    sidebar: state.sidebar,
    warning: state.warning
  }),
  dispatch => ({
    hideSidebar: () => dispatch(hideSidebar()),
    hideWarning: () => dispatch(hideWarning())
  })
)(SidebarDaemon);
