import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import styled from "styled-components";

import * as config from "../../../config";
import { genericSetItems } from "../../../util";
import API from "../../services";
import { fancy, slightlyBiggerText } from "../../styles/snippets";
import ScreenHeader from "../../components/ScreenHeader";
import AboutThing from "./components/AboutThing";

const Styles = styled.div`
  .header {
    ${fancy};
  }

  .description {
    ${slightlyBiggerText};
  }
`;

class About extends Component {
  state = {
    items: []
  };

  setItems = genericSetItems.bind(
    this,
    config.ABOUT_CACHE_KEY,
    config.ABOUT_CACHE_EXPIRATION,
    API.fetchAboutItems,
    "about"
  );

  componentDidMount() {
    this.setItems();
  }

  render() {
    const { verbiage } = this.props;
    const { items } = this.state;

    return (
      <Styles>
        <Container>
          <ScreenHeader
            icon="users"
            title={verbiage.About_title}
            description={verbiage.About_description}
          />
          {items.map(about => <AboutThing key={about.name} {...about} />)}
        </Container>
      </Styles>
    );
  }
}

export default About;
