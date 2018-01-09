import React from "react";
import { Container, Segment, Header, Button, Icon } from "semantic-ui-react";
import { Parallax } from "react-parallax";
import styled from "styled-components";

const Styles = styled.div`
  .container {
    min-height: 80vh !important;
    display: flex;
    align-items: center;
    justify-content: center;

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

function Splash(props) {
  return (
    <Styles>
      <Parallax bgImage="/city.jpg" strength={400} basic>
        <Container>
          <Segment
            className="Splash-main"
            padded="very"
            textAlign="center"
            basic
          >
            <Header>
              Paraphernalia, <em>revolutionized</em>.
            </Header>
            <Header content="Welcome to the new way of lighting up." />
            <Button.Group>
              <Button primary>
                Get started <Icon name="send" />
              </Button>
            </Button.Group>
          </Segment>
        </Container>
      </Parallax>
    </Styles>
  );
}

export default Splash;
