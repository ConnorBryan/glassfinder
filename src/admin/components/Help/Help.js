import React from "react";
import { Accordion, Item } from "semantic-ui-react";
import { partial } from "lodash";

import { HelpItem } from "../../../main/components/Help/Help";
import AdminAPI from "../../services";
import ModelManager from "../ModelManager";

export default function Help({ history }) {
  const config = {
    fetchItems: AdminAPI.fetchHelpItems,
    deleteItem: AdminAPI.deleteHelp,
    term: "help",
    resource: "help",
    render: (items, _edit, _remove) => (
      <Item.Group divided>
        {items.map((item, index) => {
          const edit = partial(_edit, item.id);
          const remove = partial(_remove, item.id);
          const currentIndex = 1;
          const activeIndex = 1;
          const handleClick = () => {};
          const { title, content } = item;

          return (
            <Accordion styled fluid>
              <HelpItem
                admin
                {...{
                  index: currentIndex,
                  activeIndex,
                  handleClick,
                  title,
                  content,
                  edit,
                  remove
                }}
              />
            </Accordion>
          );
        })}
      </Item.Group>
    )
  };

  return <ModelManager {...{ history }} {...config} />;
}
