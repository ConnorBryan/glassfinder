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
    const id = pathname.split("/")[2] || null;
    const mode = id ? ModelViewer.Modes.Detail : ModelViewer.Modes.Explore;

    return { id, mode };
  }

  render() {
    const { plural } = this.props;
    const { id } = this.state;

    const Mode = id ? DetailMode : ExploreMode;
    const props = {
      plural,
      id,
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
