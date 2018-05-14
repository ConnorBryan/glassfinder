import React from "react";
import { Container, Segment, Menu } from "semantic-ui-react";
import styled from "styled-components";

import { fancy, slightlyBiggerText } from "../../styles/snippets";

const Styles = styled.div`
  .PrivacyPolicy-wrapper {
    padding: 0 !important;
  }

  .PrivacyPolicy-menu {
    border: 1px solid #555 !important;

    & .header {
      ${fancy};
    }
  }

  .PrivacyPolicy-content {
    border: 1px solid #555 !important;
    ${slightlyBiggerText};
  }
`;

function PrivacyPolicy() {
  return (
    <Styles>
      <Container>
        <Segment className="PrivacyPolicy-wrapper" inverted basic>
          <Menu className="PrivacyPolicy-menu" attached="top" inverted>
            <Menu.Item header icon="book" content="Privacy Policy" />
          </Menu>
          <Segment className="PrivacyPolicy-content" attached="bottom" inverted>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero
            necessitatibus quaerat accusantium impedit voluptates minima aperiam
            eos illo provident magnam consequuntur blanditiis incidunt
            repellendus ex porro quidem itaque, dolorum quia.
          </Segment>
        </Segment>
      </Container>
    </Styles>
  );
}

export default PrivacyPolicy;
