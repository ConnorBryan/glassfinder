import React from "react";
import { Container, Segment, Menu } from "semantic-ui-react";
import styled from "styled-components";

import { fancy, slightlyBiggerText } from "../../styles/snippets";

const Styles = styled.div`
  .TermsAndConditions-wrapper {
    padding: 0 !important;
  }

  .TermsAndConditions-menu {
    border: 1px solid #555 !important;

    & .header {
      ${fancy};
    }
  }

  .TermsAndConditions-content {
    border: 1px solid #555 !important;
    ${slightlyBiggerText};
  }
`;

function TermsAndConditions() {
  return (
    <Styles>
      <Container>
        <Segment className="TermsAndConditions-wrapper" inverted basic>
          <Menu className="TermsAndConditions-menu" attached="top" inverted>
            <Menu.Item header icon="book" content="Terms and Conditions" />
          </Menu>
          <Segment
            className="TermsAndConditions-content"
            attached="bottom"
            fluid
            inverted
          >
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

export default TermsAndConditions;
