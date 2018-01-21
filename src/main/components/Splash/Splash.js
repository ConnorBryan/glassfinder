import React from "react";
import {
  Container,
  Segment,
  Image,
  Header,
  Button,
  Icon
} from "semantic-ui-react";
import styled from "styled-components";

const Styles = styled.div`
  background: url(/city.jpg) !important;
  .container {
    min-height: 80vh !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;

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
      background: rgba(255, 255, 255, 0.5) !important;
    }
    button {
      letter-spacing: 0.33rem !important;
      text-transform: uppercase !important;
    }
  }
`;

function Splash({ verbiage }) {
  return (
    <Styles>
      <Container className="Splash-wrapper">
        <Segment className="Splash-main" padded="very" textAlign="center" basic>
          <Header>{verbiage.Home_tagline}</Header>
          <Header content={verbiage.Home_subTagline} />
          <Button.Group>
            <Button primary>
              {verbiage.Home_getStartedButton} <Icon name="send" />
            </Button>
          </Button.Group>
        </Segment>
      </Container>
    </Styles>
  );
}

export default Splash;
