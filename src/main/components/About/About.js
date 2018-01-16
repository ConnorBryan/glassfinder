import React from "react";
import { Container, Item, Segment } from "semantic-ui-react";

const ABOUT_ITEMS = [
  {
    key: "A",
    image: "https://placehold.it/400x400",
    name: "Connor Bryan",
    role: "Lead Developer",
    blurb:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero blanditiis quaerat optio corrupti asperiores perspiciatis incidunt totam impedit consequuntur tenetur recusandae, possimus perferendis, dolorem quidem fugiat rem commodi assumenda suscipit?"
  },
  {
    key: "B",
    image: "https://placehold.it/400x400",
    name: "Connor Bryan",
    role: "Lead Developer",
    blurb:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero blanditiis quaerat optio corrupti asperiores perspiciatis incidunt totam impedit consequuntur tenetur recusandae, possimus perferendis, dolorem quidem fugiat rem commodi assumenda suscipit?"
  },
  {
    key: "C",
    image: "https://placehold.it/400x400",
    name: "Connor Bryan",
    role: "Lead Developer",
    blurb:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero blanditiis quaerat optio corrupti asperiores perspiciatis incidunt totam impedit consequuntur tenetur recusandae, possimus perferendis, dolorem quidem fugiat rem commodi assumenda suscipit?"
  }
];

function AboutItem({ image, name, role, blurb }) {
  return (
    <Item>
      <Item.Image circular size="small" src={image} />
      <Item.Content>
        <Item.Header as="h3" className="fancy">
          {name}
        </Item.Header>
        <Item.Description>
          <em>{role}</em>
        </Item.Description>
        <Item.Description>{blurb}</Item.Description>
      </Item.Content>
    </Item>
  );
}

function About(props) {
  return (
    <Container as={Segment}>
      <Item.Group basic divided relaxed="very">
        {ABOUT_ITEMS.map(about => <AboutItem key={about.key} {...about} />)}
      </Item.Group>
    </Container>
  );
}

About.propTypes = {};

export default About;
