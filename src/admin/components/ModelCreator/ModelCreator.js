import React from "react";
import PropTypes from "prop-types";

import FormScreen from "../../../client/components/FormScreen";

function ModelCreator({
  history,
  fields,
  createModel,
  redirect,
  icon,
  title,
  description
}) {
  const onSubmit = async values => {
    await createModel(values);

    history.push(redirect);
  };

  const screenHeader = { icon, title, description };
  const abstractForm = { onSubmit, fields };

  return <FormScreen {...{ screenHeader, abstractForm }} />;
}

ModelCreator.propTypes = {
  history: PropTypes.object.isRequired,
  fields: PropTypes.arrayOf(PropTypes.object).isRequired,
  createModel: PropTypes.func.isRequired,
  redirect: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

export default ModelCreator;
