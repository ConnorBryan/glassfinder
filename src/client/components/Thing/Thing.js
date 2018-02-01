import React from "react";
import { Segment, Grid, Image, Menu } from "semantic-ui-react";
import styled from "styled-components";

import { slightlyBiggerText } from "../../styles/snippets";

const Styles = styled.div`
  .Thing {
    margin: 2rem 0 2rem 0 !important;
    border: 1px solid white !important;
    border-radius: 0 !important;

    & img {
      border-right: 1px solid white !important;
    }
  }

  .Thing-row,
  .Thing-column {
    padding: 0 !important;
  }

  .Thing-menu {
    border: 1px solid white !important;
    border-radius: 0 !important;
  }

  .Thing-content {
    padding: 1rem !important;
    ${slightlyBiggerText};
  }
`;

function Thing({ image, title, top, content, bottom }) {
  return (
    <Styles>
      <Segment className="Thing" inverted>
        <Grid>
          <Grid.Row className="Thing-row">
            <Grid.Column className="Thing-column" computer={4} mobile={16}>
              <Image fluid src={image} />
            </Grid.Column>
            <Grid.Column className="Thing-column" computer={12} mobile={16}>
              <Menu className="Thing-menu" attached="top" inverted>
                <Menu.Item header content={title} />
                <Menu.Menu position="right">
                  <Menu.Item header content={top} />
                </Menu.Menu>
              </Menu>
              <div className="Thing-content">{content}</div>
              {bottom && (
                <Menu attached="bottom" inverted>
                  <Menu.Menu position="right">
                    <Menu.Item header content={bottom} />
                  </Menu.Menu>
                </Menu>
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </Styles>
  );
}

export default Thing;
