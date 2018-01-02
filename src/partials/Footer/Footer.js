import React from "react";
import { Link } from "react-router-dom";
import { Container, List } from "semantic-ui-react";

import config from "../../config";
import { getIdFromPath } from "../../util";

function Footer(props) {
  return (
    <Container fluid>
      <List divided horizontal>
        {config.footer.map(item => (
          <List.Item
            as={Link}
            to={item.to}
            id={getIdFromPath(item.to)}
            key={item.key}
          >
            {item.title}
          </List.Item>
        ))}
      </List>
    </Container>
  );
}

Footer.propTypes = {};

export default Footer;
