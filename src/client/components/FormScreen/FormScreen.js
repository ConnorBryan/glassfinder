import React from "react";
import { Responsive, Divider, Container, Grid } from "semantic-ui-react";
import styled from "styled-components";

import ScreenHeader from "../ScreenHeader";
import AbstractForm from "../AbstractForm";

function FormScreen({ screenHeader, abstractForm }) {
  const header = <ScreenHeader {...screenHeader} />;
  const form = <AbstractForm {...abstractForm} />;

  const Styles = styled.div`
    .mobile {
      padding: 0 1.5rem 0 1.5rem !important;
    }
    .grid {
      padding: 0 3rem 0 3rem !important;
    }
  `;

  return (
    <Styles>
      <Responsive as={Container} maxWidth={Responsive.onlyTablet.maxWidth}>
        <div className="mobile">
          {header}
          <Divider hidden />
          {form}
        </div>
      </Responsive>
      <Responsive
        as={Container}
        minWidth={Responsive.onlyComputer.minWidth}
        fluid
      >
        <Grid>
          <Grid.Row>
            <Grid.Column width={8} stretched>
              {header}
            </Grid.Column>
            <Grid.Column width={8}>{form}</Grid.Column>
          </Grid.Row>
        </Grid>
      </Responsive>
    </Styles>
  );
}

export default FormScreen;
