import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Container,
  Segment,
  Menu,
  Button,
  Icon,
  Responsive,
  Image,
  Header,
  Item,
  Card
} from "semantic-ui-react";
import { Parallax } from "react-parallax";
import styled from "styled-components";
import { times } from "lodash";

import {
  setLocalModelsData,
  getLocalModelsData,
  clearLocalModelsData
} from "../../util";
import services from "../../slices/shops/services";

const ID_FROM_URL = 1;

// Navbar

function MobileNavbar(props) {
  return (
    <Menu as={MobileNav} widths={2} borderless secondary>
      <Menu.Item onClick={() => {}}>
        <Image size="small" src="/logo.png" />
      </Menu.Item>
      <Menu.Item position="right" onClick={() => alert("Yeah!")}>
        <Icon name="bars" />
      </Menu.Item>
    </Menu>
  );
}

function DesktopNavbar(props) {
  return (
    <Menu borderless secondary>
      <Menu.Item onClick={() => {}}>
        <Image size="small" src="/logo.png" />
      </Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item onClick={() => {}}>Link A</Menu.Item>
        <Menu.Item onClick={() => {}}>Link B</Menu.Item>
        <Menu.Item onClick={() => {}}>Link C</Menu.Item>
        <Menu.Item as={GetStarted}>
          <Button primary basic>
            Get started <Icon name="send" />
          </Button>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
}

function Navbar(props) {
  return (
    <Container>
      <Responsive maxWidth={Responsive.onlyTablet.maxWidth}>
        <MobileNavbar />
      </Responsive>
      <Responsive minWidth={Responsive.onlyTablet.maxWidth}>
        <DesktopNavbar />
      </Responsive>
    </Container>
  );
}

// ModelViewer

class ModelViewer extends Component {
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

    const { renderTile, renderItem, renderCard } = this.props;

    // Check for previous session data to prepopulate state for convenience.
    const cachedModelData = this.checkCacheForModelData();

    this.state = {
      mode: ModelViewer.Modes.Explore, // Whether ModelViewer is showing multiple models or a single model.
      models: cachedModelData.models, // An 2D array, with the first dimension representing pages and the second representing models.
      activePage: cachedModelData.activePage, // The currently active page.
      modelsPerPage: cachedModelData.modelsPerPage, // How many models will appear on a given page.
      totalPages: cachedModelData.totalPages, // How many total pages of models there are.
      initiallyFetchedModels: cachedModelData.models.length > 0, // Whether or not the models collection has ever been populated.
      initiallyFetchedModel: false, // Whether or not the detail view has been accessed successfully.
      exploreMode: this.getInitialExploreMode(), // The method in which collections of models are displayed in bulk.
      // A tuple containing the page and index of the currently active model.
      activeModel:
        cachedModelData.models.length > 0
          ? this.findActiveInModels(cachedModelData.models)
          : null
    };

    // A cache for models to avoid needless retrieval from server.
    this.modelMap = new Map();

    // A hash of {mode => componentDidMount} replacements.
    this.ModeMounters = {
      [ModelViewer.Modes.Explore]: this.exploreModeMount,
      [ModelViewer.Modes.Detail]: this.detailModeMount
    };

    // A hash of {mode => render} replacements.
    this.ModeRenderers = {
      [ModelViewer.Modes.Explore]: this.renderExploreMode,
      [ModelViewer.Modes.Detail]: this.renderDetailMode
    };

    // a hash of {mode => render} replacements for exploring.
    this.ExploreModeRenderers = {
      [ModelViewer.ExploreModes.Tile]: renderTile,
      [ModelViewer.ExploreModes.Item]: renderItem,
      [ModelViewer.ExploreModes.Card]: renderCard
    };
  }

  componentDidMount() {
    const { mode } = this.state;

    const modeMounter = this.ModeMounters[mode];

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

    if (activeModels.length === 0) {
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
    models.forEach((page, pageIndex) =>
      page.forEach((model, modelIndex) =>
        this.modelMap.set(model.id, [pageIndex, modelIndex])
      )
    );

    clearLocalModelsData();
    setLocalModelsData(models, activePage, modelsPerPage, totalPages);
  };

  /**
   * @method checkCacheForModelData
   * @desc On initial load, attempt to retrieve cached data or return default values.
   * @returns {object} - Initial settings to load with.
   */
  checkCacheForModelData = () => {
    const cachedData = getLocalModelsData();

    return cachedData
      ? {
          models: cachedData.models,
          activePage: cachedData.activePage,
          modelsPerPage: cachedData.modelsPerPage,
          totalPages: cachedData.totalPages
        }
      : {
          models: [],
          activePage: 0,
          modelsPerPage: 0,
          totalPages: 0
        };
  };

  /**
   * @method findActiveInModels
   * @desc Iterate through all models to find the model with a given id.
   * @returns {Model}
   */
  findActiveInModels = models => {
    let activeModel = null;

    models.forEach((page, pageIndex) =>
      page.forEach(
        (model, modelIndex) =>
          model.id === ID_FROM_URL && (activeModel = [pageIndex, modelIndex])
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
   * @method getInitialExplorerMode
   * @desc Based on a variety of conditions, establish the original ExplorerMode.
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
   * @method renderExplorerMode
   * @desc Display all relevant information for ExplorerMode.
   * @returns {Component}
   */
  renderExploreMode = () => {
    const {
      models,
      activePage,
      totalPages,
      modelsPerPage,
      exploreMode,
      initiallyFetchedModels
    } = this.state;

    const renderExploreMode = this.ExploreModeRenderers[exploreMode];
    const activeModels = models[activePage];

    return initiallyFetchedModels ? (
      <section>
        <p>
          <strong>Explore Mode: </strong>
          <button
            disabled={exploreMode === ModelViewer.ExploreModes.Tile}
            onClick={this.switchToExploreTileMode}
          >
            Tiles
          </button>
          <button
            disabled={exploreMode === ModelViewer.ExploreModes.Item}
            onClick={this.switchToExploreItemMode}
          >
            Items
          </button>
          <button
            disabled={exploreMode === ModelViewer.ExploreModes.Card}
            onClick={this.switchToExploreCardMode}
          >
            Cards
          </button>
        </p>
        <p>
          <strong>Page: </strong> {activePage + 1} / {totalPages}
          <button onClick={this.goToFirstPage}>{"<<"}</button>
          <button onClick={this.regressPage}>{"<"}</button>
          <button onClick={this.advancePage}>{">"}</button>
          <button onClick={this.goToLastPage}>{">>"}</button>
          <em>Showing {modelsPerPage} models per page</em>
        </p>
        <div>
          {activeModels &&
            renderExploreMode(activeModels, this.loadDetailsFromExplore)}
        </div>
      </section>
    ) : (
      <p>Loading...</p>
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
   * @method loadDetailsFromExplore
   * @desc When switching from ExploreMode => DetailsMode, preload a specific model.
   * @param {number} id - The ID to use to lookup the model from the local map or fetch from server.
   */
  loadDetailsFromExplore = async id => {
    const cachedModel = this.modelMap.get(id);

    if (cachedModel) {
      this.setActiveModel(cachedModel);
      this.switchToDetailMode();
    }
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

    const atLeastOneModel = models[0] && models[0].length > 1;

    if (!initiallyFetchedModel && !initiallyFetchedModels) {
      return <p>Loading...</p>;
    } else if (activeModel) {
      const [page, index] = activeModel;
      const model = models[page][index];

      return renderDetail(model);
    } else if (atLeastOneModel) {
      this.setActiveModel([0, 0]);

      return renderDetail(models[0][0]);
    }
  };

  render() {
    const { mode } = this.state;

    const renderMode = this.ModeRenderers[mode];

    return (
      <section>
        <p>
          <strong>Mode: </strong>
          <button
            disabled={mode === ModelViewer.Modes.Explore}
            onClick={this.switchToExploreMode}
          >
            Explore
          </button>
          <button
            disabled={mode === ModelViewer.Modes.Detail}
            onClick={this.switchToDetailMode}
          >
            Detail
          </button>
          <button
            disabled={mode === ModelViewer.Modes.Editable}
            onClick={this.switchToEditableMode}
          >
            Editable
          </button>
        </p>
        <section>{renderMode()}</section>
      </section>
    );
  }
}

// Home

function Splash(props) {
  return (
    <Parallax bgImage="/city.jpg" strength={400} basic>
      <Container>
        <Splasher>
          <Segment padded="very" textAlign="center" basic>
            <Header>
              Paraphernalia, <em>revolutionized</em>.
            </Header>
            <Header content="Welcome to the new way of lighting up." />
            <Button.Group as={GetStarted}>
              <Button primary>
                Get started <Icon name="send" />
              </Button>
            </Button.Group>
          </Segment>
        </Splasher>
      </Container>
    </Parallax>
  );
}

function MobileFeatured(props) {
  const { image, title, description, buttonContent, buttonOnClick } = props;

  return (
    <Card.Group>
      <Card fluid raised>
        <Image src={image} />
        <Card.Content textAlign="center">
          <Card.Header as="h1">{title}</Card.Header>
          <Card.Description>{description}</Card.Description>
        </Card.Content>
        <Card.Content
          as={Button}
          content={buttonContent}
          onClick={buttonOnClick}
          color="blue"
          fluid
          extra
        >
          {buttonContent}
          <Icon name="chevron right" />
        </Card.Content>
      </Card>
    </Card.Group>
  );
}

function DesktopFeatured(props) {
  const {
    image,
    description,
    title,
    flipped,
    buttonContent,
    buttonOnClick
  } = props;

  return (
    <Item.Group>
      <Item>
        {!flipped && <Item.Image size="large" src={image} circular />}
        <Item.Content>
          <Item.Header as="h1">{title}</Item.Header>
          <Item.Description>{description}</Item.Description>
          <Item.Extra>
            <Button
              content={buttonContent}
              onClick={buttonOnClick}
              size="large"
              floated={flipped ? "left" : "right"}
              primary
            />
          </Item.Extra>
        </Item.Content>
        {flipped && <Item.Image size="large" src={image} circular />}
      </Item>
    </Item.Group>
  );
}

function Featured(props) {
  return (
    <Container>
      <section>
        <Responsive maxWidth={Responsive.onlyTablet.maxWidth}>
          <MobileFeatured {...props} />
        </Responsive>
        <Responsive minWidth={Responsive.onlyTablet.maxWidth}>
          <DesktopFeatured {...props} />
        </Responsive>
      </section>
    </Container>
  );
}

function Shops() {
  const props = {
    image: "/shops.jpg",
    title: "Shops",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia ipsa consequatur, placeat dignissimos esse provident natus ratione magni id odit nemo quasi dicta quidem! Beatae nostrum consectetur explicabo unde esse.",
    flipped: false,
    buttonContent: "Explore shops",
    buttonOnClick: () => {}
  };

  return <Featured {...props} />;
}

function Pieces() {
  const props = {
    image: "/pieces.jpg",
    title: "Pieces",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia ipsa consequatur, placeat dignissimos esse provident natus ratione magni id odit nemo quasi dicta quidem! Beatae nostrum consectetur explicabo unde esse.",
    flipped: true,
    buttonContent: "Explore pieces",
    buttonOnClick: () => {}
  };

  return <Featured {...props} />;
}

function Brands() {
  const props = {
    image: "/brands.jpg",
    title: "Brands",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia ipsa consequatur, placeat dignissimos esse provident natus ratione magni id odit nemo quasi dicta quidem! Beatae nostrum consectetur explicabo unde esse.",
    flipped: false,
    buttonContent: "Explore brands",
    buttonOnClick: () => {}
  };

  return <Featured {...props} />;
}

// Layout

function Layout(props) {
  const model = {
    exploreService: services.fetchShops,
    detailService: services.fetchShop,
    plural: "shops",
    singular: "shop",
    renderTile: (models, loadDetailsFromExplore) => {
      const style = {
        width: "10rem",
        height: "10rem",
        border: "1px solid",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      };
      return models.map((model, index) => (
        <div key={index} style={style}>
          {model.id}
          <button onClick={() => loadDetailsFromExplore(model.id)}>
            View details
          </button>
        </div>
      ));
    },
    renderItem: (models, loadDetailsFromExplore) => {
      const style = {
        width: "30rem",
        height: "10rem",
        border: "1px solid blue",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      };

      return models.map((model, index) => (
        <div key={index} style={style}>
          {model.name}
        </div>
      ));
    },
    renderCard: (models, loadDetailsFromExplore) => {
      const style = {
        width: "20rem",
        height: "10rem",
        border: "1px solid red",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      };

      return models.map((model, index) => (
        <div key={index} style={style}>
          {model.name}
        </div>
      ));
    },
    renderDetail: model => {
      const style = {
        width: "20rem",
        height: "10rem",
        border: "1px solid red",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      };

      return <div style={style}>{model.name}</div>;
    }
  };

  return (
    <Container fluid>
      <Segment basic>
        <Navbar />
      </Segment>
      <Segment.Group>
        <Segment as={NoPadding} basic>
          <Splash />
        </Segment>
        <FeatureSet>
          <Segment color="blue" secondary>
            <Shops />
          </Segment>
          <Segment color="blue" tertiary>
            <Pieces />
          </Segment>
          <Segment color="blue" secondary>
            <Brands />
          </Segment>
        </FeatureSet>
      </Segment.Group>
      <Segment>
        <ModelViewer {...model} />
      </Segment>
    </Container>
  );
}

export default Layout;

// Styling
const GetStarted = styled.div`
  button {
    letter-spacing: 0.33rem !important;
    text-transform: uppercase !important;
  }
`;

const NoPadding = styled.div`padding: 0 !important;`;

const MobileNav = styled.div`
  .right.item {
    display: inline !important;
    text-align: right !important;
  }
`;

const Splasher = styled.div`
  min-height: 80vh !important;
  display: flex;
  align-items: center;
  justify-content: center;

  em {
    color: #2185d0 !important;
  }

  .header:first-child {
    font-size: 3rem !important;
  }

  .header:second-child {
    font-size: 2rem !important;
  }

  .segment {
    background: rgba(255, 255, 255, 0.5) !important;
  }
`;

const FeatureSet = styled.div`
  section {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    min-height: 60vh !important;
  }

  h1 {
    font-size: 3rem !important;
    letter-spacing: 0.33rem !important;
    text-transform: uppercase !important;
  }

  button {
    margin-top: 1.5rem !important;
    letter-spacing: 0.33rem !important;
    text-transform: uppercase !important;
    background: #2185d0 !important;
    color: white !important;
  }

  .header {
    background: rgba(33, 133, 208, 0.1) !important;
    margin-bottom: 2rem !important;
    padding: 1rem 2rem 1rem 2rem !important;
  }

  .container {
    margin-top: 4rem !important;
    margin-bottom: 4rem !important;
  }

  .description {
    font-size: 1.5rem !important;
    line-height: 1.75rem !important;
  }

  .segment {
    margin: 0 !important;
  }

  .item.content {
    padding-left: 3rem !important;
  }
`;
