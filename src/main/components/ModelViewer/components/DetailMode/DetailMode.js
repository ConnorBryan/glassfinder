import React from "react";
import PropTypes from "prop-types";
import { Segment, Loader } from "semantic-ui-react";

function DetailMode(props) {
  const {
    renderDetail,
    models,
    activeModel,
    initiallyFetchedModels,
    initiallyFetchedModel,
    setActiveModel
  } = props;

  const atLeastOneModel = models[0] && models[0].length > 1;
  const noInitialLoad = !initiallyFetchedModel && !initiallyFetchedModels;

  if (noInitialLoad) {
    return <Loader active />;
  } else if (activeModel) {
    const [page, index] = activeModel;
    const model = models[page][index];

    return renderDetail(model);
  } else if (atLeastOneModel) {
    setActiveModel([0, 0]);

    return renderDetail(models[0][0]);
  } else {
    return <Loader active />;
  }
}

DetailMode.propTypes = {
  renderDetail: PropTypes.func.isRequired,
  models: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)).isRequired,
  activeModel: PropTypes.arrayOf(PropTypes.number).isRequired,
  initiallyFetchedModels: PropTypes.bool.isRequired,
  initiallyFetchedModel: PropTypes.bool.isRequired,
  setActiveModel: PropTypes.func.isRequired
};

export default DetailMode;
