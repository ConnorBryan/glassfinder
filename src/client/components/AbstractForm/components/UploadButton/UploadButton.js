import React from "react";
import PropTypes from "prop-types";
import uuid from "uuid/v4";

function UploadButton(props) {
  const { label, onUpload } = props;

  const id = uuid();
  let fileInput = null;

  return (
    <span>
      <label htmlFor={id} className="ui icon button fancy fluid primary">
        <i className="upload icon" /> Upload {label}
      </label>
      <input
        type="file"
        id={id}
        className="invisible"
        onChange={() => onUpload(fileInput.files[0])}
        ref={input => (fileInput = input)}
      />
    </span>
  );
}

UploadButton.propTypes = {
  label: PropTypes.string.isRequired,
  onUpload: PropTypes.func.isRequired
};

export default UploadButton;
