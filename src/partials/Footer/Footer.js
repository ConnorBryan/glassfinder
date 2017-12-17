import React from "react";
import { Container, List } from "semantic-ui-react";

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
