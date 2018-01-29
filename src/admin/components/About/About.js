import React from "react";
import { Item } from "semantic-ui-react";
import { partial } from "lodash";

import { UpdateItem } from "../../../main/components/Updates/Updates";
import AdminAPI from "../../services";
import ModelManager from "../ModelManager";

export default function About({ history }) {
  const config = {
    fetchItems: async () => [],
    deleteItem: async () => !!1,
    term: "about",
    resource: "about",
    render: (items, _edit, _remove) => (
      <Item.Group divided>
        {items.map((item, index) => {
          const edit = partial(_edit, item.id);
          const remove = partial(_remove, item.id);

          return <p>About</p>;
        })}
      </Item.Group>
    )
  };

  return <ModelManager {...{ history }} {...config} />;
}
