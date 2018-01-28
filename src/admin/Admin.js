import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import {
  Container,
  Dropdown,
  Menu,
  Loader,
  Segment,
  Header,
  Icon,
  Table
} from "semantic-ui-react";
import Aux from "react-aux";
import { partial, escapeRegExp } from "lodash";
import styled from "styled-components";
import uuid from "uuid/v4";

import { LINK_TYPES, ICON_SET } from "../main/config";
import { centered, fancy } from "../main/styles/snippets";
import UpdateShopInformation from "../main/components/MyAccount/components/UpdateShopInformation";
import AdminAPI from "./services";
import LinkRequests from "./components/LinkRequests";
import Updates from "./components/Updates";
import CreateUpdate from "./components/CreateUpdate";
import EditUpdate from "./components/EditUpdate";

export const LINK_TYPES_TO_FETCH_SERVICES = {
  [LINK_TYPES.SHOP]: AdminAPI.fetchAllShops,
  [LINK_TYPES.ARTIST]: AdminAPI.fetchAllArtists,
  [LINK_TYPES.BRAND]: AdminAPI.fetchAllBrands,
  [LINK_TYPES.PIECE]: AdminAPI.fetchAllPieces
};

export const LINK_TYPES_TO_DELETE_SERVICES = {
  [LINK_TYPES.SHOP]: AdminAPI.deleteShop,
  [LINK_TYPES.ARTIST]: AdminAPI.deleteArtist,
  [LINK_TYPES.BRAND]: AdminAPI.deleteBrand,
  [LINK_TYPES.PIECE]: AdminAPI.deletePiece
};

const Styles = styled.div`
  .navbar .item {
    ${fancy};
  }

  .white-input,
  .ui .dropdown {
    color: white !important;
    ${centered};
    ${fancy};

    & .text {
      ${fancy};
    }
  }

  .header,
  button,
  .cell-actions .item {
    ${fancy};
  }

  thead {
    & th {
      ${fancy};
    }
  }

  .viewport {
    min-height: 90vh !important;
  }

  .empty-segment {
    ${centered};
  }

  .row-actions {
    padding: 0 !important;
    position: relative !important;
  }

  .cell-actions {
    padding: 0 !important;
    position: absolute !important;
    width: 100% !important;
  }

  .cell-spacer {
    height: 6rem !important;
  }
`;

export default class Admin extends Component {
  state = {
    loading: false,
    model: LINK_TYPES.SHOP,
    collection: [],
    displayedCollection: []
  };

  componentDidMount() {
    this.fetchCollection();
  }

  /**
   * Retrieve a full listing of a model.
   * @param {string} model - If provided, switch model and retrieve the collection.
   */
  fetchCollection = (model = this.state.model) => {
    this.setState({ loading: true }, async () => {
      const service = LINK_TYPES_TO_FETCH_SERVICES[model];
      const collection = (await service()).map(model => ({
        ...model,
        rowKey: uuid(),
        columnKey: uuid()
      }));

      this.setState({
        loading: false,
        model,
        collection,
        displayedCollection: collection
      });
    });
  };

  switchCollectionToShops = partial(this.fetchCollection, LINK_TYPES.SHOP);
  switchCollectionToArtists = partial(this.fetchCollection, LINK_TYPES.ARTIST);
  switchCollectionToBrands = partial(this.fetchCollection, LINK_TYPES.BRAND);
  switchCollectionToPieces = partial(this.fetchCollection, LINK_TYPES.PIECE);

  search = ({ target: { value: query } }) => {
    this.setState({ loading: true }, () => {
      const { collection } = this.state;
      const regexp = new RegExp(escapeRegExp(query), "i");
      const isMatch = ({ name }) => regexp.test(name);
      const displayedCollection = collection.filter(isMatch);

      this.setState({ loading: false, displayedCollection });
    });
  };

  clearSearch = () => {
    const { collection } = this.state;

    this.searchInput.value = "";

    this.setState({ displayedCollection: collection });
  };

  deleteModel = id => {
    const { model } = this.state;
    const term = model.toLowerCase();
    const confirmed = window.confirm(
      `Are you sure you want to delete this ${term}?\nThis cannot be undone.`
    );

    if (confirmed) {
      this.setState({ loading: true }, async () => {
        const service = LINK_TYPES_TO_DELETE_SERVICES[model];
        const wasSuccessful = await service(id);

        this.setState({ loading: false }, () => {
          if (wasSuccessful) {
            alert(`The ${term} was successfully deleted.`);
            this.fetchCollection();
          } else alert(`The ${term} was unable to be deleted.`);
        });
      });
    }
  };

  render() {
    const {
      switchCollectionToShops,
      switchCollectionToArtists,
      switchCollectionToBrands,
      switchCollectionToPieces
    } = this;
    const { loading, model, displayedCollection } = this.state;
    const icon = ICON_SET[model];
    const menuHeader = `${model} Administration`;

    return (
      <BrowserRouter>
        <Styles>
          <Menu className="navbar">
            <Menu.Item
              as={Link}
              to="/"
              icon="square"
              content="Model administration"
            />
            <Menu.Item
              as={Link}
              to="/link-requests"
              icon="chain"
              content="Link requests"
            />
            <Menu.Item
              as={Link}
              to="/updates"
              icon="newspaper"
              content="Updates"
            />
          </Menu>
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <Container fluid>
                  <Menu attached="top" inverted>
                    <Menu.Item icon={icon} />
                    <ModelDropdown
                      {...{
                        model,
                        menuHeader,
                        switchCollectionToShops,
                        switchCollectionToArtists,
                        switchCollectionToBrands,
                        switchCollectionToPieces
                      }}
                    />
                    <Menu.Menu position="right">
                      <Menu.Item icon="close" onClick={this.clearSearch} />
                      <div className="ui right aligned category search item">
                        <div className="ui transparent icon input white-input">
                          <input
                            className="prompt"
                            type="text"
                            placeholder="Search..."
                            ref={node => (this.searchInput = node)}
                            onChange={this.search}
                          />
                          <i className="search link icon" />
                        </div>
                        <div className="results" />
                      </div>
                    </Menu.Menu>
                  </Menu>
                  <Segment attached="bottom" className="viewport">
                    {loading ? (
                      <Loader active />
                    ) : (
                      <ModelTable
                        collection={displayedCollection}
                        deleteModel={this.deleteModel}
                      />
                    )}
                  </Segment>
                </Container>
              )}
            />

            <Route exact path="/edit/:id" component={EditModel} />
            <Route exact path="/link-requests" component={LinkRequests} />
            <Route exact path="/updates" component={Updates} />
            <Route exact path="/updates/new" component={CreateUpdate} />
            <Route exact path="/updates/:id" component={EditUpdate} />
          </Switch>
        </Styles>
      </BrowserRouter>
    );
  }
}

class EditModel extends Component {
  render() {
    return <p> Derp </p>;
  }
}

function ModelDropdown({
  model,
  menuHeader,
  switchCollectionToShops,
  switchCollectionToArtists,
  switchCollectionToBrands,
  switchCollectionToPieces
}) {
  return (
    <Dropdown text={menuHeader}>
      <Dropdown.Menu>
        <Dropdown.Item
          text="Shops"
          active={model === LINK_TYPES.SHOP}
          onClick={switchCollectionToShops}
        />
        <Dropdown.Item
          text="Artists"
          active={model === LINK_TYPES.ARTIST}
          onClick={switchCollectionToArtists}
        />
        <Dropdown.Item
          text="Brands"
          active={model === LINK_TYPES.BRAND}
          onClick={switchCollectionToBrands}
        />
        <Dropdown.Item
          text="Pieces"
          active={model === LINK_TYPES.PIECE}
          onClick={switchCollectionToPieces}
        />
      </Dropdown.Menu>
    </Dropdown>
  );
}

function ModelTable({ collection, deleteModel }) {
  const exampleModel = { ...(collection[0] || {}) };

  delete exampleModel.rowKey;
  delete exampleModel.columnKey;

  const tableHeaders = Object.keys(exampleModel);

  return tableHeaders.length === 0 ? (
    <Segment className="empty-segment viewport">
      <Header as="h2">
        <Icon name="exclamation triangle" /> There is nothing to show.
      </Header>
    </Segment>
  ) : (
    <Table celled padded stackable>
      <Table.Header>
        <Table.Row>
          {tableHeaders.map(header => (
            <Table.HeaderCell key={header}>{header}</Table.HeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {collection.map(model => (
          <Aux key={model.name}>
            <Table.Row key={`${model.rowKey}`}>
              {tableHeaders.map(column => (
                <Table.Cell key={`${model.columnKey}-${column}`}>
                  {model[column]}
                </Table.Cell>
              ))}
            </Table.Row>
            <Table.Row className="row-actions">
              <Table.Cell className="cell-actions" width={tableHeaders.length}>
                <Menu inverted fluid>
                  <Menu.Item
                    as={Link}
                    to={`/edit/${model.id}`}
                    icon="pencil"
                    content="Edit"
                  />
                  <Menu.Item
                    icon="trash"
                    content="Delete"
                    onClick={() => deleteModel(model.id)}
                  />
                </Menu>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell className="cell-spacer" />
            </Table.Row>
          </Aux>
        ))}
      </Table.Body>
    </Table>
  );
}
