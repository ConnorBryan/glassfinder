import React, { Component } from "react";
import PropTypes from "prop-types";
import { Segment, Loader } from "semantic-ui-react";

import {
  retrieveFromCache,
  cacheIsExpired,
  updateCache,
  updateCacheExpiration
} from "../../../../../util";

export default class DetailMode extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    detailService: PropTypes.func.isRequired,
    renderDetail: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    const { cacheTerm, plural, id } = props;

    this.mapKey = `${cacheTerm || plural}ById`;

    // Attempt to hydrate cached data.
    const cachedMap = retrieveFromCache(this.mapKey);
    const map = new Map(
      cachedMap && !cacheIsExpired() ? JSON.parse(cachedMap) : []
    );

    this.state = {
      map,
      activeModel: map.get(id),
      loading: true
    };
  }

  componentDidMount() {
    const { activeModel } = this.state;

    return activeModel
      ? this.setState({ loading: false })
      : this.fetchActiveModel();
  }

  async fetchActiveModel() {
    try {
      const { id, detailService: fetchModel } = this.props;
      const { map } = this.state;

      const activeModel = await fetchModel(id);

      // Update the cache with the fetched model.
      map.set(id, activeModel);
      updateCache(this.mapKey, JSON.stringify([...map]));
      updateCacheExpiration();

      this.setState({ activeModel, loading: false });
    } catch (e) {
      this.setState({ loading: false }, () =>
        this.props.history.push(`${this.props.uri}`)
      );
    }
  }

  render() {
    const { renderDetail } = this.props;
    const { activeModel } = this.state;

    return activeModel ? (
      renderDetail(activeModel)
    ) : (
      <Segment>
        <Loader active />
      </Segment>
    );
  }
}
