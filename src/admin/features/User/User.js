import React from "react";
import { Button, Card } from "semantic-ui-react";
import { partial } from "lodash";

import { AboutItem } from "../../../client/components/About/About";
import AdminAPI from "../../services";
import ModelManager from "../../components/ModelManager";

export default function UserManager({ history }) {
  const config = {
    fetchItems: AdminAPI.fetchUsers,
    deleteItem: AdminAPI.deleteUser,
    term: "user",
    resource: "users",
    render: (items, _edit, _remove) => (
      <Card.Group itemsPerRow={3}>
        {items.map(({ id, email, verified, linked, type }, index) => {
          const edit = partial(_edit, id);
          const remove = partial(_remove, id);
          const meta = verified ? "Verified" : "Awaiting verification";
          const description = linked ? "Linked" : "Not linked";

          return (
            <Card key={index}>
              <Card.Content>
                <Card.Header as="h2" content={email} />
                <Card.Meta content={meta} />
                <Card.Description content={description} />
                {linked && <Card.Description content={type} />}
              </Card.Content>
              <Card.Content extra>
                <Button
                  icon="pencil"
                  onClick={edit}
                  content="Edit"
                  primary
                  fluid
                />
              </Card.Content>
              <Card.Content extra>
                <Button
                  icon="trash"
                  onClick={remove}
                  content="Remove"
                  negative
                  fluid
                />
              </Card.Content>
            </Card>
          );
        })}
      </Card.Group>
    )
  };

  return <ModelManager {...{ history }} {...config} />;
}
