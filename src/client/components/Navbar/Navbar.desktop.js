import React from "react";
import { withRouter, Link } from "react-router-dom";
import { Menu, Header, Button, Icon, Dropdown } from "semantic-ui-react";
import styled from "styled-components";
import Aux from "react-aux";

import * as config from "../../../config";

const Styles = styled.div`
  a,
  a > span,
  .fancy,
  .fancy > span {
    text-transform: uppercase !important;
    letter-spacing: 0.33rem !important;
  }
  .Navbar-container {
    margin: 0 !important;
    background: rgba(22, 22, 22, 0.7) !important;
    border-bottom: 1px solid white !important;
  }
  .header {
    color: white !important;
  }
`;

function DesktopNavbar({
  showBorder,
  account,
  signout,
  location: { pathname }
}) {
  return (
    <Styles>
      <Menu className="Navbar-container" borderless secondary inverted>
        <Menu.Item header as={Link} to="/">
          <Header as="h1" className="fancy" content="Glassfinder" />
        </Menu.Item>
        <Menu.Menu>
          {config.NAVIGATION_LINKS.map(({ to, content }, index) => (
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
                icon={config.ICON_SET[config.LINK_TYPES.SHOP]}
              />
              <Dropdown.Item
                as={Link}
                to="/artists"
                content="Artists"
                icon={config.ICON_SET[config.LINK_TYPES.ARTIST]}
              />
              <Dropdown.Item
                as={Link}
                to="/brands"
                content="Brands"
                icon={config.ICON_SET[config.LINK_TYPES.BRAND]}
              />
              <Dropdown.Item
                as={Link}
                to="/pieces"
                content="Pieces"
                icon={config.ICON_SET[config.LINK_TYPES.PIECE]}
              />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
        <Menu.Menu position="right">
          {account ? (
            <Aux>
              <Menu.Item>
                <Button className="fancy" onClick={signout}>
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
                <Button as={Link} to="/sign-in" size="large">
                  Sign in <Icon name="sign in" />
                </Button>
              </Menu.Item>
              <Menu.Item>
                <Button as={Link} to="/sign-up" size="large" primary>
                  Get started <Icon name="send" />
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
