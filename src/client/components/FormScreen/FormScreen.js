import React from "react";
import { Responsive, Divider, Container, Grid, Image } from "semantic-ui-react";
import styled from "styled-components";
import Aux from "react-aux";

import ScreenHeader from "../ScreenHeader";
import AbstractForm from "../AbstractForm";
import AbstractFormWithImage from "../AbstractFormWithImage";

function FormScreen({
  splash,
  screenHeader,
  abstractForm,
  displayNotification,
  initialImage,
  withImage
}) {
  const header = <ScreenHeader {...screenHeader} />;
  const form = withImage ? (
    <AbstractFormWithImage
      {...{ initialImage, displayNotification, abstractForm }}
    />
  ) : (
    <AbstractForm {...abstractForm} />
  );

  const Styles = styled.div`
    .mobile {
      padding: 0 1.5rem 0 1.5rem !important;
    }
    .grid {
      padding: 0 3rem 0 3rem !important;
    }

    .image {
      margin-top: 2rem !important;
      border: 1px solid white !important;
    }
  `;

  return (
    <Styles>
      <Responsive as={Container} maxWidth={Responsive.onlyTablet.maxWidth}>
        <div className="mobile">
          {header}
          <Divider hidden />
          {splash && (
            <Aux>
              <Image src={splash} fluid />
              <Divider hidden />
            </Aux>
          )}
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
              {splash && <Image src={splash} fluid />}
            </Grid.Column>
            <Grid.Column width={8}>{form}</Grid.Column>
          </Grid.Row>
        </Grid>
      </Responsive>
    </Styles>
  );
}

export default FormScreen;
