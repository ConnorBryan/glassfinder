import React from "react";
import PropTypes from "prop-types";
import { Item } from "semantic-ui-react";
import styled from "styled-components";

function Update(props) {
  return (
    <Item>
      <Item.Image circular size="small" src={props.image} />
      <Item.Content>
        <Item.Header className="fancy" size="medium">
          {props.header}
        </Item.Header>
        <Item.Meta>{props.meta}</Item.Meta>
        <Item.Description>{props.description}</Item.Description>
        <TextAlign align="right">
          <Item.Extra>Posted by {props.author}</Item.Extra>
        </TextAlign>
      </Item.Content>
    </Item>
  );
}

Update.propTypes = {
  image: PropTypes.string,
  header: PropTypes.string,
  meta: PropTypes.string,
  description: PropTypes.string,
  author: PropTypes.string
};

export default Update;

// Styling

const TextAlign = styled.div`text-align: ${({ align }) => align};`;
