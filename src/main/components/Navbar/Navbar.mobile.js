import React from "react";
import { Menu, Image, Icon } from "semantic-ui-react";
import styled from "styled-components";

const Styles = styled.div`
  .right.item {
    display: inline !important;
    text-align: right !important;
  }
`;

function MobileNavbar() {
  return (
    <Menu widths={2} borderless secondary>
      <Menu.Item onClick={() => {}}>
        <Image size="small" src="/logo.png" />
      </Menu.Item>
      <Menu.Item position="right" onClick={() => alert("Yeah!")}>
        <Icon name="bars" />
      </Menu.Item>
    </Menu>
  );
}

export default MobileNavbar;
