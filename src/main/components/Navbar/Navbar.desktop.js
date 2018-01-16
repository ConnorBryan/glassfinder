import React from "react";
import { Link } from "react-router-dom";
import { Menu, Image, Button, Icon } from "semantic-ui-react";
import styled from "styled-components";
import Aux from "react-aux";

import { NAVIGATION_LINKS } from "../../config";

const Styles = styled.div`
  a {
    letter-spacing: 0.33rem !important;
    text-transform: uppercase !important;
    &.header.item:hover {
      background: inherit !important;
      color: inherit !important;
    }
  }
`;

function DesktopNavbar({ account, signout }) {
  return (
    <Styles>
      <Menu borderless secondary>
        <Menu.Item header as={Link} to="/">
          <Image size="small" src="/logo.png" />
        </Menu.Item>
        <Menu.Menu position="right">
          {NAVIGATION_LINKS.map(({ to, content }, index) => (
            <Menu.Item key={index} as={Link} to={to} content={content} />
          ))}
          {account ? (
            <Aux>
              <Menu.Item>
                <Button as="a" onClick={signout} primary basic>
                  Sign out <Icon name="sign out" />
                </Button>
              </Menu.Item>
              <Menu.Item>
                <Button as={Link} to="/my-account" primary>
                  My account <Icon name="user" />
                </Button>
              </Menu.Item>
            </Aux>
          ) : (
            <Aux>
              <Menu.Item>
                <Button as={Link} to="/signin" primary basic>
                  Sign in <Icon name="sign in" />
                </Button>
              </Menu.Item>
              <Menu.Item>
                <Button as={Link} to="/signup" primary>
                  Sign up <Icon name="send" />
                </Button>
              </Menu.Item>
            </Aux>
          )}
        </Menu.Menu>
      </Menu>
    </Styles>
  );
}

export default DesktopNavbar;
