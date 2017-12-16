import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Container, List, Segment } from "semantic-ui-react";

import config from "../../config";

function Footer(props) {
  return (
    <Container fluid>
      <List divided horizontal>
        {config.footerItems.map(item => (
          <List.Item description={item.title} key={item.key} />
        ))}
      </List>
    </Container>
  );
}

Footer.propTypes = {};

export default Footer;
