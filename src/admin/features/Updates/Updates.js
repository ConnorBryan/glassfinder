import React from "react";
import { Item, Button } from "semantic-ui-react";
import { partial } from "lodash";
import moment from "moment";

import AdminAPI from "../../services";
import ModelManager from "../../components/ModelManager";

function UpdateItem({
  verbiage,
  image,
  title,
  createdAt,
  content,
  author,
  admin,
  edit,
  remove
}) {
  const date = moment(new Date(createdAt)).format("MMMM Do YYYY, h:mm:ss A");

  return (
    <Item>
      <Item.Image circular size="small" src={image} />
      <Item.Content>
        <Item.Header size="medium">{title}</Item.Header>
        <Item.Meta>{date}</Item.Meta>
        <Item.Description
          dangerouslySetInnerHTML={{
            __html: content
          }}
        />
        <Item.Extra>
          {verbiage.Updates_postedBy} {author}
        </Item.Extra>
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
