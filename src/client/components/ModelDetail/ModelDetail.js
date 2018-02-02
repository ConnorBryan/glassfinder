import React, { Component } from "react";
import { Segment, Loader } from "semantic-ui-react";

export default class ModelDetail extends Component {
  state = {
    loading: true,
    model: null
  };

  fetchModel = this.props.fetchModel;

  componentDidMount() {
    this.setModel();
  }

  setModel = () => {
    this.setState({ loading: true }, async () => {
      const { id } = this.props;

      const model = await this.fetchModel(id);

      this.setState({ model, loading: false });
    });
  };

  render() {
    const { render } = this.props;
    const { loading, model } = this.state;

    return (
      <Segment className="ModelDetail-main" inverted>
        {loading || !model ? (
          <Loader active content="Loading..." />
        ) : (
          render(model)
        )}
      </Segment>
    );
  }
}
