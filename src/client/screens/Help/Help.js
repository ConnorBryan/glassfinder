import React, { Component } from "react";
import { Container, Segment, Button, Accordion, Icon } from "semantic-ui-react";
import Aux from "react-aux";
import styled from "styled-components";

import * as config from "../../../config";
import { genericSetItems } from "../../../util";
import API from "../../services";
import { fancy, slightlyBiggerText } from "../../styles/snippets";
import ScreenHeader from "../../components/ScreenHeader";

const Styles = styled.div`
  .Help-item {
    ${fancy};
  }
  .Help-content {
    ${slightlyBiggerText};

    ul {
      line-height: 3rem !important;
    }
  }
  .Help-accordion {
    border: 1px solid white !important;

    & .accordion {
      background: transparent !important;
    }
  }
`;

export function HelpItem({
  admin,
  edit,
  remove,
  index,
  activeIndex,
  handleClick,
  title,
  content
}) {
  return (
    <Aux>
      <Accordion.Title
        className="Help-item"
        active={activeIndex === index}
        index={index}
        onClick={handleClick}
      >
        <Icon name="dropdown" /> {title}
      </Accordion.Title>
      <Accordion.Content
        className="Help-content"
        active={activeIndex === index}
        dangerouslySetInnerHTML={{
          __html: content
        }}
      />
      {admin && (
        <Segment basic>
          <Button icon="pencil" content="Edit" primary onClick={edit} />
          <Button icon="trash" content="Remove" negative onClick={remove} />
        </Segment>
      )}
    </Aux>
  );
}

class Help extends Component {
  state = {
    items: [],
    activeIndex: -1
  };

  setItems = genericSetItems.bind(
    this,
    config.HELP_CACHE_KEY,
    config.HELP_CACHE_EXPIRATION,
    API.fetchHelpItems,
    "help"
  );

  componentDidMount() {
    this.setItems();
  }

  handleClick = (e, { index }) => {
    const { activeIndex } = this.state;

    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  render() {
    const { verbiage } = this.props;
    const { items, activeIndex } = this.state;

    return (
      <Styles>
        <Container>
          <ScreenHeader
            icon="list ul"
            title={verbiage.Help_title}
            description={verbiage.Help_description}
          />
          <Segment className="Help-accordion" inverted>
            <Accordion styled fluid inverted>
              {items.map(({ title, content }, index) => (
                <HelpItem
                  key={index}
                  {...{ index, activeIndex, title, content }}
                  handleClick={this.handleClick}
                />
              ))}
            </Accordion>
          </Segment>
        </Container>
      </Styles>
    );
  }
}

export default Help;
