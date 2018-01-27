import React, { Component } from "react";
import axios from "axios";
import {
  Container,
  Dropdown,
  Button,
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

import {
  ADMIN_API_ROOT,
  LINK_TYPES,
  LINK_TYPES_TO_RESOURCES,
  ICON_SET
} from "../main/config";
import API from "../main/services";
import { centered, fancy } from "../main/styles/snippets";

const Styles = styled.div`
  input,
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

class AdminAPI extends API {
  static async fetchAllModels(plural) {
    try {
      const url = `${ADMIN_API_ROOT}/${plural}`;
      const { data: { payload: { collection } } } = await axios.get(url);

      return collection;
    } catch (e) {
      console.error(e);

      return [];
    }
  }

  static fetchAllShops = partial(AdminAPI.fetchAllModels, "shops");
  static fetchAllArtists = partial(AdminAPI.fetchAllModels, "artists");
  static fetchAllBrands = partial(AdminAPI.fetchAllModels, "brands");
  static fetchAllPieces = partial(AdminAPI.fetchAllModels, "pieces");

  static async deleteModel(plural, id) {
    try {
      const url = `${ADMIN_API_ROOT}/${plural}/${id}`;

      await axios.delete(url);

      return true;
    } catch (e) {
      console.error(e);

      return false;
    }
  }

  static deleteShop = partial(AdminAPI.deleteModel, "shops");
  static deleteArtist = partial(AdminAPI.deleteModel, "artists");
  static deleteBrand = partial(AdminAPI.deleteModel, "brands");
  static deletePiece = partial(AdminAPI.deleteModel, "pieces");
}

const LINK_TYPES_TO_FETCH_SERVICES = {
  [LINK_TYPES.SHOP]: AdminAPI.fetchAllShops,
  [LINK_TYPES.ARTIST]: AdminAPI.fetchAllArtists,
  [LINK_TYPES.BRAND]: AdminAPI.fetchAllBrands,
  [LINK_TYPES.PIECE]: AdminAPI.fetchAllPieces
};

const LINK_TYPES_TO_DELETE_SERVICES = {
  [LINK_TYPES.SHOP]: AdminAPI.deleteShop,
  [LINK_TYPES.ARTIST]: AdminAPI.deleteArtist,
  [LINK_TYPES.BRAND]: AdminAPI.deleteBrand,
  [LINK_TYPES.PIECE]: AdminAPI.deletePiece
};

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

      console.log("model", model);

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

        wasSuccessful
          ? alert(`The ${term} was successfully deleted.`)
          : alert(`The ${term} was unable to be deleted.`);

        this.setState({ loading: false });

        if (wasSuccessful) this.fetchCollection();
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
      <Styles>
        <Container fluid>
          <Menu attached="top" inverted>
            <Menu.Item icon={icon} />
            <Menu.Item content={menuHeader} header />
            <Menu.Menu position="right">
              <ModelDropdown
                {...{
                  model,
                  switchCollectionToShops,
                  switchCollectionToArtists,
                  switchCollectionToBrands,
                  switchCollectionToPieces
                }}
              />
            </Menu.Menu>
            <Menu.Menu position="right">
              <Menu.Item icon="close" onClick={this.clearSearch} />
              <div className="ui right aligned category search item">
                <div className="ui transparent icon input">
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
      </Styles>
    );
  }
}

function ModelDropdown({
  model,
  switchCollectionToShops,
  switchCollectionToArtists,
  switchCollectionToBrands,
  switchCollectionToPieces
}) {
  return (
    <Dropdown text="Switch Model">
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
    <Table celled padded>
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
                <Menu widths={2} inverted fluid>
                  <Menu.Item icon="pencil" content="Edit" />
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
