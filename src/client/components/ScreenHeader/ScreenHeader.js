import React from "react";
import PropTypes from "prop-types";
import { Segment, Header, Icon } from "semantic-ui-react";
import styled from "styled-components";

import { fancy, slightlyBiggerText } from "../../styles/snippets";

const Styles = styled.div`
  .segments {
    border: 1px solid #555 !important;
  }

  .header {
    ${fancy};
  }

  .huh {
    border-color: #555 !important;
  }

  .ScreenHeader-description {
    border-color: #555 !important;
    border-bottom: none !important;
    ${slightlyBiggerText};
  }
`;

function ScreenHeader({ icon, title, description }) {
  return (
    <Styles>
      <Segment.Group>
        <Segment className="huh" attached="top" inverted>
          <Header as="h3">
            <Icon name={icon} /> {title}
          </Header>
        </Segment>
        <Segment
          attached="bottom"
          inverted
          className="ScreenHeader-description"
        >
          {description}
        </Segment>
      </Segment.Group>
    </Styles>
  );
}

ScreenHeader.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string
};

export default ScreenHeader;
