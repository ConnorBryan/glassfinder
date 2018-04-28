import React from "react";
import { Link } from "react-router-dom";
import { Container, Segment, Header, Button, Icon } from "semantic-ui-react";
import styled from "styled-components";

import { centered, fancy } from "../../styles/snippets";

const Styles = styled.div`
  background: url(/city.jpg) !important;
  .container {
    ${centered} min-height: 80vh !important;
    em {
      color: #2185d0 !important;
    }

    .header:first-child {
      font-size: 3rem !important;
    }

    .header:second-child {
      font-size: 2rem !important;
    }

    .segment {
      background: rgba(22, 22, 22, 0.7) !important;
      border: 1px solid #555 !important;
    }

    button {
      ${fancy};
    }
  }
`;

function Splash({ verbiage }) {
  return (
    <Styles>
      <Container className="Splash-wrapper">
        <Segment
          className="Splash-main"
          padded="very"
          textAlign="center"
          basic
          inverted
        >
          <Header>{verbiage.Home_tagline}</Header>
          <Header content={verbiage.Home_subTagline} />
          <Button.Group>
            <Button as={Link} to="/sign-up" size="huge" primary>
              {verbiage.Home_getStartedButton} <Icon name="chevron right" />
            </Button>
          </Button.Group>
        </Segment>
      </Container>
    </Styles>
  );
}

export default Splash;
