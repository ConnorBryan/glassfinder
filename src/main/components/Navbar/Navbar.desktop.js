import React from "react";
import { Link } from "react-router-dom";
import { Menu, Image, Button, Icon } from "semantic-ui-react";
import styled from "styled-components";

import { NAVIGATION_LINKS } from "../../config";

const Styles = styled.div`
  button {
    letter-spacing: 0.33rem !important;
    text-transform: uppercase !important;
  }
`;

function DesktopNavbar() {
  return (
    <Styles>
      <Menu borderless secondary>
        <Menu.Item as={Link} to="/">
          <Image size="small" src="/logo.png" />
        </Menu.Item>
        <Menu.Menu position="right">
          {NAVIGATION_LINKS.map(({ to, content }, index) => (
            <Menu.Item as={Link} to={to} content={content} />
          ))}
          <Menu.Item>
            <Button primary basic>
              Get started <Icon name="send" />
            </Button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </Styles>
  );
}

export default DesktopNavbar;
