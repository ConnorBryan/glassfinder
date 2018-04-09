import React, { Component } from "react";
import { Formik, Field } from "formik";
import styled from "styled-components";

import API from "../../../services";
import { InputWithDropdown } from "../_UploadPiece";

const Styles = styled.div``;

export default class UpdateAssociations extends Component {
  render() {
    return (
      <div>
        <p>Current associations</p>
        <ul>
          <li>Brand A</li>
          <li>Brand B</li>
          <li>Brand C</li>
        </ul>
      </div>
    );
  }
}
