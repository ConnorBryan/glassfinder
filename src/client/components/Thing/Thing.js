import React from "react";
import { Segment, Grid, Image, Menu, Responsive } from "semantic-ui-react";
import styled from "styled-components";

import { slightlyBiggerText } from "../../styles/snippets";

const Styles = styled.div`
  .Thing {
    margin: 2rem 0 2rem 0 !important;
    border: 1px solid white !important;
    border-radius: 0 !important;

    & img {
      border-right: 1px solid white !important;
      border-bottom: 1px solid white !important;
    }
  }

  .Thing-row,
  .Thing-column {
    padding: 0 !important;
  }

  .Thing-menu {
    margin: 0 !important;
    border: 1px solid white !important;
    border-radius: 0 !important;
  }

  .Thing-content {
    padding: 1rem !important;
    margin-bottom: 3rem !important;
    ${slightlyBiggerText};
  }

  .Thing-bottom {
    position: absolute !important;
    bottom: 0 !important;
    right: 0 !important;
  }

  .Thing-bottom_menu {
    font-size: 0.8rem !important;
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
                <Responsive
                  as={Menu.Menu}
                  position="right"
                  minWidth={Responsive.onlyTablet.minWidth}
                >
                  <Menu.Item header content={top} />
                </Responsive>
              </Menu>
              <Responsive
                as={Menu}
                maxWidth={Responsive.onlyMobile.maxWidth}
                className="Thing-menu"
                width={16}
                inverted
              >
                {bottom && (
                  <Menu.Item
                    className="Thing-bottom_menu"
                    header
                    content={bottom}
                  />
                )}
                <Menu.Menu position="right">
                  <Menu.Item header content={top} />
                </Menu.Menu>
              </Responsive>
              <div
                className="Thing-content"
                dangerouslySetInnerHTML={{ __html: content }}
              />
              <Responsive minWidth={Responsive.onlyTablet.minWidth}>
                {bottom && (
                  <Grid.Row className="Thing-bottom">
                    <Grid.Column width={16}>
                      <Menu inverted>
                        <Menu.Menu position="right">
                          <Menu.Item header content={bottom} />
                        </Menu.Menu>
                      </Menu>
                    </Grid.Column>
                  </Grid.Row>
                )}
              </Responsive>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </Styles>
  );
}

export default Thing;
