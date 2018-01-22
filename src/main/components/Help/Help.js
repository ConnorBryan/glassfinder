import React, { Component } from "react";
import { Container, Accordion, Icon, Segment } from "semantic-ui-react";
import Aux from "react-aux";
import styled from "styled-components";

import API from "../../services";
import { genericSetItems } from "../../util";
import { fancy, slightlyBiggerText } from "../../styles/snippets";
import ScreenHeader from "../ScreenHeader";

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
`;

function HelpItem({ index, activeIndex, handleClick, title, content }) {
  return (
    <Aux key={index}>
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
    </Aux>
  );
}

class Help extends Component {
  state = {
    items: [],
    activeIndex: -1
  };

  componentDidMount() {
    this.setItems();
  }

  setItems = () => {
    const setItems = genericSetItems.bind(this);

    setItems("help", API.fetchHelpItems);
  };

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
          <Segment>
            <Accordion styled fluid>
              {items.map(({ title, content }, index) => (
                <HelpItem
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
