import React from "react";
import PropTypes from "prop-types";

import AbstractForm from "./AbstractForm";

function AbstractUpdateForm({ originalProps, currentValues }) {
  originalProps.fields = originalProps.fields.map(field => ({
    ...field,
    value: currentValues[field.name] || field.value
  }));

  return <AbstractForm {...originalProps} />;
}

AbstractUpdateForm.propTypes = {
  originalProps: PropTypes.object.isRequired,
  currentValues: PropTypes.objectOf(PropTypes.string)
};

AbstractUpdateForm.defaultProps = {
  currentValues: {}
};

export default AbstractUpdateForm;
