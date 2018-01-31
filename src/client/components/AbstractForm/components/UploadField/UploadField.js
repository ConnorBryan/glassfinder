import React from "react";
import PropTypes from "prop-types";
import { Form } from "semantic-ui-react";

import UploadButton from "../UploadButton";

function UploadField(props) {
  const { label, onUpload } = props;

  return (
    <Form.Field>
      <label>{label}</label>
      <UploadButton label={label} onUpload={onUpload} />
    </Form.Field>
  );
}

UploadField.propTypes = {
  label: PropTypes.string.isRequired,
  onUpload: PropTypes.func.isRequired
};

export default UploadField;
