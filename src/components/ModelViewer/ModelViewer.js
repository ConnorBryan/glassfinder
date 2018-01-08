import React, { Component } from "react";
import PropTypes from "prop-types";
import { times } from "lodash";
import {
  Container,
  Menu,
  Dropdown,
  Icon,
  Sidebar,
  Segment
} from "semantic-ui-react";
import styled from "styled-components";

import {
  setLocalModelsData,
  getLocalModelsData,
  clearLocalModelsData
} from "../../util";

import ExploreMode from "./components/ExploreMode";
import DetailMode from "./components/DetailMode";

const ID_FROM_URL = 1;

export default class ModelViewer extends Component {
  static propTypes = {
    exploreService: PropTypes.func.isRequired,
    detailService: PropTypes.func.isRequired,
    plural: PropTypes.string.isRequired,
    singular: PropTypes.string.isRequired,
    renderTile: PropTypes.func.isRequired,
    renderItem: PropTypes.func.isRequired,
    renderCard: PropTypes.func.isRequired,
    renderDetail: PropTypes.func.isRequired
  };

  static Modes = {
    Explore: "Explore", // ExploreMode is a view containing a collection of models with basic information.
    Detail: "Detail", // DetailMode is a view containing a single model with more in-depth information.
    Editable: "Editable" // EditableMode is a modifier allowing modification requests to be made to models (requires authorization).
  };

  static ExploreModes = {
    Tile: "Tile", // TileExploreMode is a subview that displays a collection of models as small squares with a tooltip effect.
    Item: "Item", // ItemExploreMode is a subview that displays a collection of models as a stacked subsection of the page.
    Card: "Card" // CardExploreMode is a subview that displays a collection of models as they would appear in DetailMode.
  };

  constructor(props) {
    super(props);

    // Check for previous session data to prepopulate state for convenience.
    const {
      models,
      activePage,
      modelsPerPage,
      totalPages
    } = this.checkCacheForModelData();

    this.state = {
      models, // A 2D array, with the first dimension representing pages and the second representing models.
      activePage, // The currently active page.
      modelsPerPage, // How many models will appear on a given page.
      totalPages, // How many total pages of models there are.
      mode: ModelViewer.Modes.Explore, // Whether ModelViewer is showing multiple models or a single model.
      initiallyFetchedModels: models.length > 0, // Whether or not the models collection has ever been populated.
      initiallyFetchedModel: false, // Whether or not the detail view has been accessed successfully.
      exploreMode: this.getInitialExploreMode(), // The method in which collections of models are displayed in bulk.
      activeModel: models.length > 0 ? this.findActiveInModels(models) : null // A tuple containing the page and index of the currently active model.
    };

    // A cache for models to avoid needless retrieval from server.
    this.modelMap = new Map();
  }

  componentDidMount() {
    const { mode } = this.state;

    this.modeMounters = {
      [ModelViewer.Modes.Explore]: this.exploreModeMount,
      [ModelViewer.Modes.Detail]: this.detailModeMount
    };

    const modeMounter = this.modeMounters[mode];

    modeMounter();
  }

  /**
   * @method switchMode
   * @desc Change the currently active mode.
   * @param {string} mode - The mode to change to.
   */
  switchMode = mode => {
    if (!ModelViewer.Modes[mode]) {
      throw Error(`Invalid mode for ModelViewer: ${mode}`);
    }

    this.setState({ mode });
  };

  /**
   * @async
   * @method updateModels
   * @desc After changing the page, either load the new models from memory or retrieve them from the server.
   */
  updateModels = async () => {
    const { plural, exploreService } = this.props;
    const { models, activePage } = this.state;

    const activeModels = models[activePage];

    if (activeModels && activeModels.length === 0) {
      const { [plural]: fetchedModels } = await exploreService(activePage);

      this.setState(({ models, activePage, modelsPerPage, totalPages }) => {
        const updatedModels = [...models];

        updatedModels[activePage] = fetchedModels;

        this.cacheModelData(
          updatedModels,
          activePage,
          modelsPerPage,
          totalPages
        );

        return { models: updatedModels };
      });
    }
  };

  /**
   * @method setActiveModel
   * @desc Changes the coordinates to point to a new active model for detail rendering.
   * @param {Array<number>} activeModel - A tuple of [pageIndex, modelIndex]
   */
  setActiveModel = activeModel => this.setState({ activeModel });

  /**
   * @method cacheModelData
   * @desc Update the in-memory cache and commit the current state of model exploration to LocalStorage.
   * @param {Array<Array<Model>>} models
   * @param {number} activePage
   * @param {number} modelsPerPage
   * @param {number} totalPages
   */
  cacheModelData = (models, activePage, modelsPerPage, totalPages) => {
    const { singular } = this.props;

    models.forEach((page, pageIndex) =>
      page.forEach((model, modelIndex) =>
        this.modelMap.set(model.id, [pageIndex, modelIndex])
      )
    );

    clearLocalModelsData(singular);
    setLocalModelsData(singular, models, activePage, modelsPerPage, totalPages);
  };

  /**
   * @method checkCacheForModelData
   * @desc On initial load, attempt to retrieve cached data or return default values.
   * @returns {object} - Initial settings to load with.
   */
  checkCacheForModelData = () => {
    const { singular } = this.props;

    const cachedData = getLocalModelsData(singular);

    return (
      cachedData || {
        models: [],
        activePage: 0,
        modelsPerPage: 0,
        totalPages: 0
      }
    );
  };

  /**
   * @method findActiveInModels
   * @desc Iterate through all models to find the model with a given id.
   * @returns {Model}
   */
  findActiveInModels = (models, id = ID_FROM_URL) => {
    let activeModel = null;

    models.forEach((page, pageIndex) =>
      page.forEach(
        (model, modelIndex) =>
          model.id === id && (activeModel = [pageIndex, modelIndex])
      )
    );

    return activeModel;
  };

  /* Explore Mode */

  /**
   * @async
   * @method exploreModeMount
   * @desc A componentDidMount replacement for when ModelViewer initially loads in ExploreMode.
   */
  exploreModeMount = async () => {
    const { models: initialModels } = this.state;
    const { exploreService, plural } = this.props;

    if (initialModels.length > 0) return;

    const {
      [plural]: models,
      totalPages,
      perPage: modelsPerPage
    } = await exploreService();

    const paginatedModels = [[...models]];

    this.cacheModelData(paginatedModels, 0, modelsPerPage, totalPages);

    // Prepare empty pages for the other non-fetched models.
    times(totalPages - 1, () => paginatedModels.push([]));

    this.setState({
      models: paginatedModels,
      totalPages,
      modelsPerPage,
      initiallyFetchedModels: true,
      initiallyFetchedModel: true
    });
  };

  /**
   * @method getInitialExploreMode
   * @desc Based on a variety of conditions, establish the original ExploreMode.
   * @returns {string}
   */
  getInitialExploreMode = () => {
    // TODO: Query screen size to determine what modes are allowed.
    return ModelViewer.ExploreModes.Tile;
  };

  /**
   * @method setActivePage
   * @desc Adjust the currently active page in ExploreMode.
   */
  setActivePage = activePage => {
    const { models, modelsPerPage, totalPages } = this.state;

    this.cacheModelData(models, activePage, modelsPerPage, totalPages);

    this.setState({ activePage }, this.updateModels);
  };

  /**
   * @method goToFirstPage
   * @desc Set the active page to 0.
   */
  goToFirstPage = () => this.setActivePage(0);

  /**
   * @method regressPage
   * @desc Go back one page.
   */
  regressPage = () => {
    const { activePage, totalPages } = this.state;

    const nextPage = activePage - 1;

    if (nextPage > -1) {
      this.setActivePage(nextPage);
    }
  };

  /**
   * @method advancePage
   * @desc Go forward one page.
   */
  advancePage = () => {
    const { activePage, totalPages } = this.state;

    const nextPage = activePage + 1;

    if (nextPage < totalPages) {
      this.setActivePage(nextPage);
    }
  };

  /**
   * @method goToLastPage
   * @desc Set the active page to the last page.
   */
  goToLastPage = () => this.setActivePage(this.state.totalPages - 1);

  /**
   * @async
   * @method switchToExploreMode
   * @desc Alternate from DetailMode to ExploreMode.
   */
  switchToExploreMode = async () => {
    const { initiallyFetchedModels } = this.state;

    if (!initiallyFetchedModels) {
      await this.exploreModeMount();
    }

    this.switchMode(ModelViewer.Modes.Explore);
  };

  /**
   * @method switchExploreMode
   * @desc Alternate between the various ExploreModes.
   * @param {string} exploreMode
   */
  switchExploreMode = exploreMode => this.setState({ exploreMode });

  switchToExploreTileMode = () =>
    this.switchExploreMode(ModelViewer.ExploreModes.Tile);
  switchToExploreItemMode = () =>
    this.switchExploreMode(ModelViewer.ExploreModes.Item);
  switchToExploreCardMode = () =>
    this.switchExploreMode(ModelViewer.ExploreModes.Card);

  /**
   * @method renderExploreMode
   * @desc Display all relevant information for ExploreMode.
   * @returns {Component}
   */
  renderExploreMode = children => {
    const { plural, renderTile, renderItem, renderCard } = this.props;
    const {
      models,
      activePage,
      totalPages,
      modelsPerPage,
      exploreMode,
      initiallyFetchedModels
    } = this.state;

    if (!this.exploreModeRenderers) {
      this.exploreModeRenderers = {
        [ModelViewer.ExploreModes.Tile]: renderTile,
        [ModelViewer.ExploreModes.Item]: renderItem,
        [ModelViewer.ExploreModes.Card]: renderCard
      };
    }

    const renderExploreMode = this.exploreModeRenderers[exploreMode];
    const activeModels = models[activePage];

    return (
      <ExploreMode
        {...{
          plural,
          children,
          renderTile,
          renderItem,
          renderCard,
          models,
          activePage,
          totalPages,
          modelsPerPage,
          exploreMode,
          initiallyFetchedModels,
          renderExploreMode,
          activeModels,
          goToFirstPage: this.goToFirstPage,
          regressPage: this.regressPage,
          advancePage: this.advancePage,
          goToLastPage: this.goToLastPage,
          loadDetailsModeFromExploreMode: this.loadDetailsModeFromExploreMode
        }}
      />
    );
  };

  /* Detail Mode */

  /**
   * @async
   * @method detailModeMount
   * @desc A componentDidMount replacement for when ModelViewer initially loads in DetailMode.
   */
  detailModeMount = async () => {
    const { detailService, singular } = this.props;
    const { activeModel } = this.state;

    if (!activeModel) {
      const model = await detailService(ID_FROM_URL);

      this.setState({
        models: [[model]],
        activeModel: [0, 0],
        initiallyFetchedModel: true
      });
    }
  };

  /**
   * @async
   * @method loadDetailsModeFromExploreMode
   * @desc When switching from ExploreMode => DetailsMode, preload a specific model.
   * @param {number} id - The ID to use to lookup the model from the local map or fetch from server.
   */
  loadDetailsModeFromExploreMode = async id => {
    const cachedModel = this.modelMap.get(id);

    if (cachedModel) {
      this.setActiveModel(cachedModel);
    } else {
      const { models } = this.state;
      const activeModel = this.findActiveInModels(models, id);

      this.setActiveModel(activeModel);
    }

    this.switchToDetailMode();
  };

  /**
   * @method switchToDetailMode
   * @desc Alternate from ExploreMode to DetailMode.
   */
  switchToDetailMode = () => this.switchMode(ModelViewer.Modes.Detail);

  /**
   * @method renderDetailMode
   * @desc Display all relevant information for DetailMode.
   * @returns {Component}
   */
  renderDetailMode = () => {
    const { renderDetail } = this.props;
    const {
      models,
      activeModel,
      initiallyFetchedModels,
      initiallyFetchedModel
    } = this.state;

    return (
      <DetailMode
        {...{
          renderDetail,
          models,
          activeModel,
          initiallyFetchedModels,
          initiallyFetchedModel,
          setActiveModel: this.setActiveModel
        }}
      />
    );
  };

  render() {
    const { icon, plural } = this.props;
    const { mode, exploreMode } = this.state;

    if (!this.modeRenderers) {
      this.modeRenderers = {
        [ModelViewer.Modes.Explore]: this.renderExploreMode,
        [ModelViewer.Modes.Detail]: this.renderDetailMode
      };
    }

    const renderMode = this.modeRenderers[mode];

    const menuHeader = (
      <Menu.Menu>
        <Menu.Item icon={icon} />
        <Menu.Item header content={plural} />
      </Menu.Menu>
    );

    const modeMenu = (
      <Menu.Menu position="right">
        <Menu.Item icon="window restore" />
        <Menu.Item header>Mode</Menu.Item>
        <Menu.Item
          active={mode === ModelViewer.Modes.Explore}
          onClick={this.switchToExploreMode}
        >
          Explore
        </Menu.Item>
        <Menu.Item
          active={mode === ModelViewer.Modes.Detail}
          onClick={this.switchToDetailMode}
        >
          Detail
        </Menu.Item>
      </Menu.Menu>
    );

    const optionsMenu = (
      <Menu.Menu position="right">
        <Menu.Item icon="options" />
        <Menu.Item header>Options</Menu.Item>
        <Dropdown item text="View as">
          <Dropdown.Menu>
            <Dropdown.Item
              active={exploreMode === ModelViewer.ExploreModes.Tile}
              onClick={this.switchToExploreTileMode}
            >
              <Icon name="grid layout" /> Tiles
            </Dropdown.Item>
            <Dropdown.Item
              active={exploreMode === ModelViewer.ExploreModes.Item}
              onClick={this.switchToExploreItemMode}
            >
              <Icon name="list layout" /> Items
            </Dropdown.Item>
            <Dropdown.Item
              active={exploreMode === ModelViewer.ExploreModes.Card}
              onClick={this.switchToExploreCardMode}
            >
              <Icon name="block layout" /> Cards
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown item text="Sort by" />
      </Menu.Menu>
    );

    const ExploreModels = ({ children }) => this.renderExploreMode(children);

    return (
      <Container>
        <Menu as={ModelViewerMenu} attached="top">
          {menuHeader}
          {mode === ModelViewer.Modes.Explore && optionsMenu}
          {modeMenu}
        </Menu>
        <Sidebar.Pushable as={ModelViewerContent}>
          <Sidebar
            as={Segment}
            raised
            animation="overlay"
            width="very wide"
            direction="right"
            visible={mode === ModelViewer.Modes.Detail}
          >
            {mode === ModelViewer.Modes.Detail && renderMode()}
          </Sidebar>
          <Sidebar.Pusher dimmed={mode === ModelViewer.Modes.Detail}>
            {mode === ModelViewer.Modes.Explore ? renderMode() : <Segment />}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Container>
    );
  }
}

/* Styling */

const ModelViewerMenu = styled.nav`
  .header {
    text-transform: uppercase !important;
    letter-spacing: 0.25rem !important;
  }
`;

const ModelViewerContent = styled.div`
  .sidebar {
    width: 100% !important;
  }
  .pusher,
  .segment {
    min-height: 75vh !important;
  }
`;
