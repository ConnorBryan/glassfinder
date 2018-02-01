import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import styled from "styled-components";

import * as config from "../../../config";
import { CacheProvider, genericSetItems } from "../../../util";
import API from "../../services";
import { fancy, slightlyBiggerText } from "../../styles/snippets";
import ScreenHeader from "../../components/ScreenHeader";
import UpdateThing from "./components/UpdateThing";

const Styles = styled.div`
  .description {
    ${slightlyBiggerText};
  }
  .header {
    ${fancy};
  }
`;

class Updates extends Component {
  state = {
    items: []
  };

  setItems = genericSetItems.bind(
    this,
    config.UPDATE_CACHE_KEY,
    config.UPDATE_CACHE_EXPIRATION,
    API.fetchUpdateItems,
    "updates"
  );

  componentDidMount() {
    (async () => {
      await this.setItems();
      this.sortItems();
    })();
  }

  sortItems = () => {
    const { items } = this.state;

    const sorted = items.sort((a, b) => {
      const prevTime = new Date(a.createdAt).getTime();
      const nextTime = new Date(b.createdAt).getTime();

      return nextTime > prevTime ? -1 : 1;
    });

    CacheProvider.update(
      config.UPDATE_CACHE_KEY,
      sorted,
      config.UPDATE_CACHE_EXPIRATION
    );

    this.setState({ items: sorted });
  };

  render() {
    const { items } = this.state;
    const { verbiage } = this.props;

    return (
      <Styles>
        <Container>
          <ScreenHeader
            icon="newspaper"
            title={verbiage.Updates_title}
            description={verbiage.Updates_description}
          />
          {items.map(update => (
            <UpdateThing key={update.title} verbiage={verbiage} {...update} />
          ))}
        </Container>
      </Styles>
    );
  }
}

export default Updates;
