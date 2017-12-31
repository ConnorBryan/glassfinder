import React from "react";
import PropTypes from "prop-types";

import AbstractForm from "./AbstractForm";

function AbstractUpdateForm({ originalProps, currentValues }) {
  const fields = originalProps.fields.map(field => ({
    ...field,
    value: currentValues[field.name] || field.value
  }));
  return <AbstractForm fields={fields} />;
}

AbstractUpdateForm.propTypes = {
  originalProps: PropTypes.object.isRequired,
  currentValues: PropTypes.object
};

AbstractUpdateForm.defaultProps = {
  currentValues: {}
};

export default AbstractUpdateForm;
