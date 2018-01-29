import React from "react";
import { Item } from "semantic-ui-react";
import { partial } from "lodash";

import { AboutItem } from "../../../main/components/About/About";
import AdminAPI from "../../services";
import ModelManager from "../../components/ModelManager";

export default function About({ history }) {
  const config = {
    fetchItems: AdminAPI.fetchAboutItems,
    deleteItem: AdminAPI.deleteAbout,
    term: "about",
    resource: "about",
    render: (items, _edit, _remove) => (
      <Item.Group divided>
        {items.map((item, index) => {
          const verbiage = {
            Updates_postedBy: "Posted by"
          };
          const edit = partial(_edit, item.id);
          const remove = partial(_remove, item.id);

          return (
            <AboutItem
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
