import React from "react";
import { Menu, Image, Button, Icon } from "semantic-ui-react";
import styled from "styled-components";

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
        <Menu.Item onClick={() => {}}>
          <Image size="small" src="/logo.png" />
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item onClick={() => {}}>Link A</Menu.Item>
          <Menu.Item onClick={() => {}}>Link B</Menu.Item>
          <Menu.Item onClick={() => {}}>Link C</Menu.Item>
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
