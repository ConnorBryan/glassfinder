import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Menu, Image, Header, Icon, Divider } from "semantic-ui-react";
import styled from "styled-components";

import { fancy } from "../../styles/snippets";

const Styles = styled.div`
  .right.item {
    display: inline !important;
    text-align: right !important;
  }

  .Navbar-container {
    margin: 0 !important;
    background: rgba(22, 22, 22, 0.7) !important;
  }

  .fancy {
    color: white !important;
    ${fancy};
  }
`;

function MobileNavbar({
  mobileNavigationActive,
  showMobileNavigation,
  hideMobileNavigation,
  showBorder
}) {
  const onClick = () =>
    mobileNavigationActive ? hideMobileNavigation() : showMobileNavigation();
  return (
    <Styles showBorder={showBorder}>
      <Menu className="Navbar-container" inverted borderless secondary>
        <Menu.Item as={Link} to="/">
          <Header as="h1" className="fancy" content="Glassfinder" />
        </Menu.Item>
        <Menu.Item
          active={mobileNavigationActive}
          position="right"
          onClick={onClick}
        >
          <Icon name="bars" />
        </Menu.Item>
      </Menu>
      {showBorder && <Divider fitted />}
    </Styles>
  );
}

MobileNavbar.propTypes = {
  mobileNavigationActive: PropTypes.bool.isRequired,
  showMobileNavigation: PropTypes.func.isRequired,
  hideMobileNavigation: PropTypes.func.isRequired
};

export default MobileNavbar;
