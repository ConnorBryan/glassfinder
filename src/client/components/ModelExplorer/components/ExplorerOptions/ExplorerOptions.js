import React from "react";
import { Menu } from "semantic-ui-react";
import styled from "styled-components";

import * as config from "../../../../../config";
import { fancy } from "../../../../styles/snippets";

const Styles = styled.div`
  .ExplorerOptions {
    min-width: 30vw !important;
    max-width: 30vw !important;
    min-height: 80vh !important;
    max-height: 80vh !important;
    border: 1px solid white !important;
    border-right: none !important;

    .header {
      ${fancy};
    }
  }
`;

function ExplorerOptions({ sort }) {
  return (
    <Styles>
      <Menu className="ExplorerOptions" vertical inverted>
        <Menu.Item header content="Sort by" />
        <Menu.Item
          icon="calendar"
          content="Date (Ascending)"
          onClick={() => sort(config.SORT_DATE_ASCENDING)}
        />
        <Menu.Item
          icon="calendar"
          content="Date (Descending)"
          onClick={() => sort(config.SORT_DATE_DESCENDING)}
        />
        <Menu.Item
          icon="sort alphabet ascending"
          content="Name (Ascending)"
          onClick={() => sort(config.SORT_NAME_ASCENDING)}
        />
        <Menu.Item
          icon="sort alphabet descending"
          content="Name (Descending)"
          onClick={() => sort(config.SORT_NAME_DESCENDING)}
        />
      </Menu>
    </Styles>
  );
}

export default ExplorerOptions;
