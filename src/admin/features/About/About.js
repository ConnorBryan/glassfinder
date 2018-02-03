import React from "react";
import { Button, Item } from "semantic-ui-react";
import { partial } from "lodash";

import AdminAPI from "../../services";
import ModelManager from "../../components/ModelManager";

function AboutItem({ admin, edit, remove, image, name, title, description }) {
  return (
    <Item>
      <Item.Image circular size="medium" src={image} />
      <Item.Content>
        <Item.Header as="h3">{name}</Item.Header>
        <Item.Description>
          <em>{title}</em>
        </Item.Description>
        <Item.Description>{description}</Item.Description>
        {admin && (
          <Item.Extra>
            <Button icon="pencil" content="Edit" primary onClick={edit} />
            <Button icon="trash" content="Remove" negative onClick={remove} />
          </Item.Extra>
        )}
      </Item.Content>
    </Item>
  );
}

export default function AboutManager({ history }) {
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
