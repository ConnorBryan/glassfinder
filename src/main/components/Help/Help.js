import React, { Component } from "react";
import { Container, Accordion, Icon, Segment } from "semantic-ui-react";
import Aux from "react-aux";

import ScreenHeader from "../ScreenHeader";

const HELP_TOPICS = [
  {
    key: "1",
    title: "Foo",
    content: "Bar"
  },
  {
    key: "2",
    title: "Foo",
    content: "Bar"
  },
  {
    key: "3",
    title: "Foo",
    content: "Bar"
  }
];

class Help extends Component {
  state = { activeIndex: -1 };

  handleClick = (e, { index }) => {
    const { activeIndex } = this.state;

    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  render() {
    const { verbiage } = this.props;
    const { activeIndex } = this.state;

    return (
      <Container>
        <ScreenHeader
          icon="list ul"
          title={verbiage.Help_title}
          description={verbiage.Help_description}
        />
        <Segment>
          <Accordion styled fluid>
            {HELP_TOPICS.map((topic, index) => (
              <Aux key={topic.key}>
                <Accordion.Title
                  active={activeIndex === index}
                  index={index}
                  onClick={this.handleClick}
                >
                  <Icon name="dropdown" /> {topic.title}
                </Accordion.Title>
                <Accordion.Content active={activeIndex === index}>
                  {topic.content}
                </Accordion.Content>
              </Aux>
            ))}
          </Accordion>
        </Segment>
      </Container>
    );
  }
}

export default Help;
