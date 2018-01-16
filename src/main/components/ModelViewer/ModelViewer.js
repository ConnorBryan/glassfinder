import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Container } from "semantic-ui-react";

import ExploreMode from "./components/ExploreMode";
import DetailMode from "./components/DetailMode";

class ModelViewer extends Component {
  static Modes = {
    Explore: "Explore", // ExploreMode is a view containing a collection of models with basic information.
    Detail: "Detail" // DetailMode is a view containing a single model with more in-depth information.
  };

  constructor(props) {
    super(props);

    const { id, mode } = this.determineIdAndMode();

    this.state = {
      id,
      mode
    };
  }

  determineIdAndMode() {
    const { location: { pathname } } = this.props;
    const isViewMyPieces = pathname.includes("view-my-pieces");
    const offset = isViewMyPieces ? 3 : 2;
    const id = pathname.split("/")[offset] || null;
    const mode = id ? ModelViewer.Modes.Detail : ModelViewer.Modes.Explore;

    return { id, mode };
  }

  getMode() {
    const { mode } = this.state;

    const modes = {
      [ModelViewer.Modes.Explore]: ExploreMode,
      [ModelViewer.Modes.Detail]: DetailMode
    };

    return modes[mode];
  }

  render() {
    const { uri, plural, cacheTerm } = this.props;
    const { id, mode } = this.state;

    const Mode = this.getMode();
    const props = {
      uri,
      plural,
      id,
      cacheTerm,
      ...this.props,
      ...this.state
    };

    return (
      <Container>
        <Mode {...props} />
      </Container>
    );
  }
}

export default withRouter(ModelViewer);
