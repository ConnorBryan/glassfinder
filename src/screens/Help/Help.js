import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Accordion,
  Button,
  Card,
  Header,
  Icon,
  Image,
  Segment
} from "semantic-ui-react";

import config from "../../config";
import withPageHeader from "../../atomic/withPageHeader";

const Aux = ({ children }) => children;

class Help extends Component {
  static propTypes = {};

  state = { activeIndex: -1 };

  handleClick = (e, { index }) => {
    const { activeIndex } = this.state;

    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  render() {
    const { activeIndex } = this.state;

    return (
      <Segment.Group>
        <Segment attached="top">
          <Header as="h3" className="fancy">
            <Icon name="list ul" /> Topics
          </Header>
        </Segment>
        <Segment attached="bottom">
          <Accordion styled fluid>
            {config.helpTopics.map((topic, index) => (
              <Aux>
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
      </Segment.Group>
    );
  }
}

export default withPageHeader(config.pageHeaders.help, Help);
