import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Menu, Image, Icon } from "semantic-ui-react";
import styled from "styled-components";

const Styles = styled.div`
  .right.item {
    display: inline !important;
    text-align: right !important;
  }
`;

function MobileNavbar({
  mobileNavigationActive,
  showMobileNavigation,
  hideMobileNavigation
}) {
  const onClick = () =>
    mobileNavigationActive ? hideMobileNavigation() : showMobileNavigation();
  return (
    <Styles>
      <Menu widths={2} borderless secondary>
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
    </Styles>
  );
}

MobileNavbar.propTypes = {
  mobileNavigationActive: PropTypes.bool.isRequired,
  showMobileNavigation: PropTypes.func.isRequired,
  hideMobileNavigation: PropTypes.func.isRequired
};

export default MobileNavbar;
