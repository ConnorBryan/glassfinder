import React, { Component } from "react";
import {
  Container,
  Segment,
  Button,
  Divider,
  Accordion,
  Icon
} from "semantic-ui-react";
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
        <Container as={Segment}>
          <ScreenHeader
            icon="list ul"
            title={verbiage.Help_title}
            description={verbiage.Help_description}
          />
          <Divider hidden />
          <Accordion styled fluid>
            {items.map(({ title, content }, index) => (
              <HelpItem
                key={index}
                {...{ index, activeIndex, title, content }}
                handleClick={this.handleClick}
              />
            ))}
          </Accordion>
        </Container>
      </Styles>
    );
  }
}

export default Help;
