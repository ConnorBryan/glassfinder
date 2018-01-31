import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Menu, Image, Icon, Divider } from "semantic-ui-react";
import styled from "styled-components";

const Styles = styled.div`
  .right.item {
    display: inline !important;
    text-align: right !important;
  }
  .ui.secondary.menu a.item:hover {
    background: white !important;
  }
  .Navbar-container {
    background: white !important;
    margin: 0 !important;
    border-bottom: ${({ showBorder }) =>
      showBorder ? "1px solid rgb(212, 212, 212)" : "none"} !important;
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
      <Menu className="Navbar-container" borderless secondary>
        <Menu.Item as={Link} to="/">
          <Image size="small" src="/logo.png" />
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
