import React from "react";
import { withRouter, Link } from "react-router-dom";
import {
  Menu,
  Image,
  Button,
  Icon,
  Dropdown,
  Divider
} from "semantic-ui-react";
import styled from "styled-components";
import Aux from "react-aux";

import { ICON_SET, LINK_TYPES, NAVIGATION_LINKS } from "../../config";

const Styles = styled.div`
  a,
  a > span,
  .fancy,
  .fancy > span {
    text-transform: uppercase !important;
    letter-spacing: 0.33rem !important;
    &.header.item:hover {
      background: inherit !important;
      color: inherit !important;
    }
  }
  .Navbar-container {
    background: ${({ showBorder }) =>
      showBorder ? "rgba(255, 255, 255, 0.75)" : "white"} !important;
    margin: 0 !important;
    border-bottom: ${({ showBorder }) =>
      showBorder ? "1px solid rgb(212, 212, 212)" : "none"} !important;
  }
`;

function DesktopNavbar({
  showBorder,
  account,
  signout,
  location: { pathname }
}) {
  return (
    <Styles showBorder={showBorder}>
      <Menu className="Navbar-container" borderless secondary>
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
              <Dropdown.Item
                as={Link}
                to="/shops"
                content="Shops"
                icon={ICON_SET[LINK_TYPES.SHOP]}
              />
              <Dropdown.Item
                as={Link}
                to="/artists"
                content="Artists"
                icon={ICON_SET[LINK_TYPES.ARTIST]}
              />
              <Dropdown.Item
                as={Link}
                to="/brands"
                content="Brands"
                icon={ICON_SET[LINK_TYPES.BRAND]}
              />
              <Dropdown.Item
                as={Link}
                to="/pieces"
                content="Pieces"
                icon={ICON_SET[LINK_TYPES.PIECE]}
              />
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
