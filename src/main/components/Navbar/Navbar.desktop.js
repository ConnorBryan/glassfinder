import React from "react";
import { withRouter, Link } from "react-router-dom";
import { Menu, Image, Button, Icon, Dropdown } from "semantic-ui-react";
import styled from "styled-components";
import Aux from "react-aux";

import { NAVIGATION_LINKS } from "../../config";

const Styles = styled.div`
  a,
  .fancy,
  .fancy > span a > span {
    letter-spacing: 0.33rem !important;
    text-transform: uppercase !important;
    &.header.item:hover {
      background: inherit !important;
      color: inherit !important;
    }
  }
`;

function DesktopNavbar({ account, signout, location: { pathname } }) {
  return (
    <Styles>
      <Menu borderless secondary>
        <Menu.Item header as={Link} to="/">
          <Image size="small" src="/logo.png" />
        </Menu.Item>
        <Menu.Menu position="right">
          {NAVIGATION_LINKS.map(({ to, content }, index) => (
            <Menu.Item
              key={index}
              as={Link}
              to={to}
              content={content}
              active={to === pathname}
            />
          ))}
          <Dropdown className="fancy" item text="Explore">
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/shops" content="Shops" />
              <Dropdown.Item as={Link} to="/artists" content="Artists" />
              <Dropdown.Item as={Link} to="/brands" content="Brands" />
              <Dropdown.Item as={Link} to="/pieces" content="Pieces" />
            </Dropdown.Menu>
          </Dropdown>
          {account ? (
            <Aux>
              <Menu.Item>
                <Button className="fancy" onClick={signout} primary basic>
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
                <Button as={Link} to="/sign-in" primary basic>
                  Sign in <Icon name="sign in" />
                </Button>
              </Menu.Item>
              <Menu.Item>
                <Button as={Link} to="/sign-up" primary>
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

export default withRouter(DesktopNavbar);
