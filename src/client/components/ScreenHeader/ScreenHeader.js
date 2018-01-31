import React from "react";
import PropTypes from "prop-types";
import { Segment, Header, Icon } from "semantic-ui-react";
import styled from "styled-components";

import { fancy, slightlyBiggerText } from "../../styles/snippets";

const Styles = styled.div`
  .header {
    ${fancy};
  }
  .ScreenHeader-description {
    ${slightlyBiggerText};
  }
`;

function ScreenHeader({ icon, title, description }) {
  return (
    <Styles>
      <Segment attached="top" inverted>
        <Header as="h3">
          <Icon name={icon} /> {title}
        </Header>
      </Segment>
      <Segment attached="bottom" className="ScreenHeader-description">
        {description}
      </Segment>
    </Styles>
  );
}

ScreenHeader.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string
};

export default ScreenHeader;