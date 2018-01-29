import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  Container,
  Segment,
  Loader,
  Header,
  Icon,
  Menu
} from "semantic-ui-react";
import styled from "styled-components";

import { fancy, centered } from "../../../main/styles/snippets";

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

export default class ModelManager extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    fetchItems: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
    term: PropTypes.string.isRequired,
    resource: PropTypes.string.isRequired,
    verbiage: PropTypes.object.isRequired,
    render: PropTypes.func.isRequired
  };

  state = {
    loading: false,
    items: []
  };

  componentDidMount() {
    this.fetchItems();
  }

  fetchItems = () => {
    this.setState({ loading: true }, async () => {
      const { fetchItems } = this.props;

      const items = (await fetchItems()).sort(dateSort);

      this.setState({ items, loading: false });
    });
  };

  edit = id => {
    const { history, resource } = this.props;

    history.push(`/${resource}/${id}`);
  };

  remove = id => {
    const { term, deleteItem } = this.props;
    const confirmed = window.confirm(
      `Are you sure you want to delete this ${term}?\nThis cannot be undone.`
    );

    if (confirmed) {
      this.setState({ loading: true }, async () => {
        const wasSuccessful = await deleteItem(id);

        this.setState({ loading: false }, () => {
          wasSuccessful
            ? this.fetchItems()
            : alert(`The ${term} was unable to be deleted.`);
        });
      });
    }
  };

  render() {
    const { edit, remove } = this;
    const { resource, term, render } = this.props;
    const { loading, items } = this.state;
    const createTo = `/${resource}/new`;
    const createContent = `Create ${term}`;

    return (
      <Styles>
        <Container>
          <Menu attached="top" inverted>
            <Menu.Menu position="right">
              <Menu.Item
                as={Link}
                to={createTo}
                icon="plus"
                content={createContent}
              />
            </Menu.Menu>
          </Menu>
          {loading ? (
            <Segment attached="bottom" className="viewport">
              <Loader active />
            </Segment>
          ) : items.length > 0 ? (
            <Segment attached="bottom" className="viewport">
              {render(items, edit, remove)}
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

/* === */

function dateSort(a, b) {
  const { a: aCreatedAt } = a;
  const { b: bCreatedAt } = b;

  return new Date(aCreatedAt).getTime() > new Date(bCreatedAt).getTime()
    ? -1
    : 1;
}
