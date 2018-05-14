import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import styled from "styled-components";

import { fancy, slightlyBiggerText } from "../../styles/snippets";
import ScreenHeader from "../../components/ScreenHeader";

const Styles = styled.div`
  .header {
    ${fancy};
  }

  .description {
    ${slightlyBiggerText};
  }
`;

class Purchase extends Component {
  render() {
    return (
      <Styles>
        <Container>
          <ScreenHeader
            icon="users"
            title="Purchase a piece"
            description="We are still developing this functionality. Stay tuned for more information!"
          />
        </Container>
      </Styles>
    );
  }
}

export default Purchase;
