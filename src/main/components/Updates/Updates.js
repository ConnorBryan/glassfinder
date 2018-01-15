import React from "react";
import { Container, Item, Icon, Segment } from "semantic-ui-react";

const UPDATES = [
  {
    key: "87c98c0f-00f7-45a3-97db-eccb1b7277ee",
    image: "https://placehold.it/400x400",
    header: "Test",
    meta: "03/19/2017",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero blanditiis quaerat optio corrupti asperiores perspiciatis incidunt totam impedit consequuntur tenetur recusandae, possimus perferendis, dolorem quidem fugiat rem commodi assumenda suscipit?",
    author: "Connor Bryan"
  },
  {
    key: "08411f35-f411-4c9a-89c8-657c41f2eda6",
    image: "https://placehold.it/400x400",
    header: "Test",
    meta: "03/18/2017",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero blanditiis quaerat optio corrupti asperiores perspiciatis incidunt totam impedit consequuntur tenetur recusandae, possimus perferendis, dolorem quidem fugiat rem commodi assumenda suscipit?",
    author: "Connor Bryan"
  },
  {
    key: "A",
    image: "https://placehold.it/400x400",
    header: "Test",
    meta: "03/17/2017",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero blanditiis quaerat optio corrupti asperiores perspiciatis incidunt totam impedit consequuntur tenetur recusandae, possimus perferendis, dolorem quidem fugiat rem commodi assumenda suscipit?",
    author: "Connor Bryan"
  }
];

function Update({ image, header, meta, description, author }) {
  return (
    <Item>
      <Item.Image circular size="small" src={image} />
      <Item.Content>
        <Item.Header className="fancy" size="medium">
          {header}
        </Item.Header>
        <Item.Meta>{meta}</Item.Meta>
        <Item.Description>{description}</Item.Description>
        <Item.Extra>Posted by {author}</Item.Extra>
      </Item.Content>
    </Item>
  );
}

function Updates() {
  return (
    <Container>
      <Segment.Group>
        <Item.Group as={Segment} basic divided relaxed="very">
          <Item>
            <Item.Header as="h3" className="fancy">
              <Icon name="newspaper" /> All Updates
            </Item.Header>
          </Item>
          {UPDATES.map(update => <Update key={update.key} {...update} />)}
        </Item.Group>
      </Segment.Group>
    </Container>
  );
}

export default Updates;
