import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Item,
  Segment,
  Loader,
  Header,
  Icon,
  Menu
} from "semantic-ui-react";
import { partial } from "lodash";
import styled from "styled-components";

import { fancy, centered } from "../../../main/styles/snippets";
import { UpdateItem } from "../../../main/components/Updates/Updates";
import AdminAPI from "../../services";

const Styles = styled.div`
  .viewport {
    min-height: 95vh !important;
  }

  .loading-viewport {
    ${centered};
  }

  .menu .item {
    ${fancy};
  }
`;

export default class Updates extends Component {
  state = {
    loading: false,
    updates: []
  };

  componentDidMount() {
    this.fetchUpdates();
  }

  fetchUpdates = () => {
    this.setState({ loading: true }, async () => {
      const updates = await AdminAPI.fetchUpdateItems();
      const sortedUpdates = updates.sort((a, b) => {
        const { a: aCreatedAt } = a;
        const { b: bCreatedAt } = b;

        return new Date(aCreatedAt).getTime() > new Date(bCreatedAt).getTime()
          ? -1
          : 1;
      });

      this.setState({ updates: sortedUpdates }, () => {
        this.setState({ loading: false });
      });
    });
  };

  edit = id => {
    const { history } = this.props;

    history.push(`/updates/${id}`);
  };

  remove = id => {
    const confirmed = window.confirm(
      `Are you sure you want to delete this update?\nThis cannot be undone.`
    );

    if (confirmed) {
      this.setState({ loading: true }, async () => {
        const wasSuccessful = await AdminAPI.deleteUpdate(id);

        this.setState({ loading: false }, () => {
          if (wasSuccessful) {
            alert(`The update was successfully deleted.`);
            this.fetchUpdates();
          } else alert(`The update was unable to be deleted.`);
        });
      });
    }
  };

  render() {
    const { loading, updates } = this.state;

    const verbiage = {
      Updates_postedBy: "Posted by"
    };

    return (
      <Styles>
        <Container>
          <Menu attached="top" inverted>
            <Menu.Menu position="right">
              <Menu.Item
                as={Link}
                to="/updates/new"
                icon="plus"
                content="Create update"
              />
            </Menu.Menu>
          </Menu>
          {loading ? (
            <Segment attached="bottom" className="viewport">
              <Loader active />
            </Segment>
          ) : updates.length > 0 ? (
            <Segment attached="bottom" className="viewport">
              <Item.Group divided>
                {updates.map((update, index) => {
                  const edit = partial(this.edit, update.id);
                  const remove = partial(this.remove, update.id);

                  return (
                    <UpdateItem
                      admin
                      key={index}
                      {...{ verbiage, edit, remove }}
                      {...update}
                    />
                  );
                })}
              </Item.Group>
            </Segment>
          ) : (
            <Segment attached="bottom" className="viewport loading-viewport">
              <Header as="h2">
                <Icon name="exclamation triangle" /> There is nothing to show.
              </Header>
            </Segment>
          )}
        </Container>
      </Styles>
    );
  }
}
