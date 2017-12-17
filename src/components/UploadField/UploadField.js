import React from "react";
import PropTypes from "prop-types";
import { Form, Segment } from "semantic-ui-react";

import config from "../../config";
import UploadButton from "../UploadButton";

function UploadField(props) {
  const { label, onUpload } = props;

  return (
    <Segment color={config.color}>
      <Form.Field>
        <UploadButton label={label} onUpload={onUpload} />
      </Form.Field>
    </Segment>
  );
}

UploadField.propTypes = {
  label: PropTypes.string.isRequired,
  onUpload: PropTypes.func.isRequired
};

export default UploadField;
