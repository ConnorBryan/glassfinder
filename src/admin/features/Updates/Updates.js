import React from "react";
import { Item } from "semantic-ui-react";
import { partial } from "lodash";

import { UpdateItem } from "../../../client/components/Updates/Updates";
import AdminAPI from "../../services";
import ModelManager from "../../components/ModelManager";

export default function UpdateManager({ history }) {
  const verbiage = {
    Updates_postedBy: "Posted by"
  };
  const config = {
    verbiage,
    fetchItems: AdminAPI.fetchUpdateItems,
    deleteItem: AdminAPI.deleteUpdate,
    term: "update",
    resource: "updates",
    render: (items, _edit, _remove) => (
      <Item.Group divided>
        {items.map((item, index) => {
          const edit = partial(_edit, item.id);
          const remove = partial(_remove, item.id);

          return (
            <UpdateItem
              admin
              key={index}
              {...{ verbiage, edit, remove }}
              {...item}
            />
          );
        })}
      </Item.Group>
    )
  };

  return <ModelManager {...{ history }} {...config} />;
}
