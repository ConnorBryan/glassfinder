import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Sidebar, Menu } from "semantic-ui-react";

import { NAVIGATION_LINKS } from "../../config";

function MobileNavigation({ mobileNavigationActive, hideMobileNavigation }) {
  return (
    <Sidebar
      as={Menu}
      visible={mobileNavigationActive}
      animation="overlay"
      width="thin"
      vertical
      inverted
    >
      <Menu.Item as={Link} to="/" onClick={hideMobileNavigation}>
        Home
      </Menu.Item>
      {NAVIGATION_LINKS.map(({ to, content }, index) => (
        <Menu.Item
          as={Link}
          to={to}
          content={content}
          onClick={hideMobileNavigation}
        />
      ))}
      <Menu.Item onClick={hideMobileNavigation}>Close</Menu.Item>
    </Sidebar>
  );
}

MobileNavigation.propTypes = {
  mobileNavigationActive: PropTypes.bool.isRequired,
  hideMobileNavigation: PropTypes.func.isRequired
};

export default MobileNavigation;
