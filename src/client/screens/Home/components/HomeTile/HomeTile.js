import React from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  Icon,
  Header,
  Segment,
  Image,
  Button,
  Menu
} from "semantic-ui-react";
import styled from "styled-components";

import { fancy } from "../../../../styles/snippets";

const Styles = styled.div`
  border-radius: 0 !important;
  border: 1px solid white !important;
  padding: 0 !important;

  .header,
  .item {
    ${fancy};
  }

  .HomeTile-menu {
    border-bottom: 1px solid white !important;
  }
`;

function HomeTile({ icon, title, link, image }) {
  return (
    <Grid.Column
      className="HomeTile"
      as={Styles}
      mobile={16}
      tablet={8}
      computer={8}
      largeScreen={8}
      widescreen={8}
    >
      <Segment.Group>
        <Menu className="HomeTile-menu" attached="top" inverted>
          <Menu.Item header as="h2">
            <Icon name={icon} /> {title}
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item
              icon="send"
              as={Link}
              to={link}
              content={`Explore ${title}`}
            />
          </Menu.Menu>
        </Menu>
        <Image src={image} />
      </Segment.Group>
    </Grid.Column>
  );
}

export default HomeTile;
