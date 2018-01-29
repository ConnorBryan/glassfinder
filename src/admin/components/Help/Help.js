import React from "react";
import { Item } from "semantic-ui-react";
import { partial } from "lodash";

import { UpdateItem } from "../../../main/components/Updates/Updates";
import AdminAPI from "../../services";
import ModelManager from "../ModelManager";

export default function Help({ history }) {
  const config = {
    fetchItems: async () => [],
    deleteItem: async () => !!1,
    term: "help",
    resource: "help",
    render: (items, _edit, _remove) => (
      <Item.Group divided>
        {items.map((item, index) => {
          const edit = partial(_edit, item.id);
          const remove = partial(_remove, item.id);

          return <p>Help</p>;
        })}
      </Item.Group>
    )
  };

  return <ModelManager {...{ history }} {...config} />;
}
