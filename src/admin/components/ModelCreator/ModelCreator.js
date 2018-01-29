import React from "react";
import PropTypes from "prop-types";
import Yup from "yup";
import { Container, Segment } from "semantic-ui-react";

import ScreenHeader from "../../../main/components/ScreenHeader";
import AbstractForm from "../../../main/components/AbstractForm";
import AdminAPI from "../../services";

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

  return (
    <Container as={Segment}>
      <ScreenHeader {...{ icon, title, description }} />
      <AbstractForm {...{ onSubmit, fields }} />
    </Container>
  );
}

ModelCreator.propTypes = {
  history: PropTypes.object.isRequired,
  fields: PropTypes.arrayOf(PropTypes.object).isRequired,
  createModel: PropTypes.func.isRequired,
  redirect: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

export default ModelCreator;
