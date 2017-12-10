import React from "react";
import PropTypes from "prop-types";
import { withFormik } from "formik";
import styled from 'styled-components';
import {
  Form,
  Container,
  Header,
  Segment,
  Button,
  Icon
} from "semantic-ui-react";

const i = '!important';

const Fancy = styled.div`
  text-transform: uppercase ${i};
  letter-spacing: 0.33rem ${i};
`;

const FancyButton = props => <Button as={Fancy} {...props} />

function BaseAbstractForm(props) {
  const {
    /* Custom */
    icon,
    header,

    /* Formik */
    values,
    touched,
    errors,
    dirty,
    isSubmitting,
    handleChange,
    setFieldValue,
    handleBlur,
    handleSubmit,
    handleReset
  } = props;

  return (
    <Form as={Container}>
      <Segment.Group stacked>
        <Segment attached="top">
          <Header as="h2">
            <Icon name={icon} /> {header}
          </Header>
        </Segment>
        <Segment attached="bottom">Form</Segment>
        <Segment attached="bottom">
          <Button.Group fluid>
            <FancyButton onClick={handleReset} content="Reset" negative />
            <Button.Or />
            <FancyButton onClick={handleSubmit} content="Send" positive />
          </Button.Group>
        </Segment>
      </Segment.Group>
    </Form>
  );
}

AbstractForm.propTypes = {};

function AbstractForm(props) {
  const { validationSchema, handleSubmit } = props;
  const Instance = withFormik({
    mapPropsToValues: props => {
      return Object.keys(props).reduce(
        (values, prop) => ({ ...values, [prop]: props[prop] }),
        {}
      );
    },
    validationSchema,
    handleSubmit
  })(BaseAbstractForm);

  return <Instance {...props} />;
}

AbstractForm.propTypes = {
  header: PropTypes.string,
  validationSchema: PropTypes.object,
  handleSubmit: PropTypes.func
};

AbstractForm.defaultProps = {
  icon: "question circle",
  header: "Abstract Form",
  validationSchema: {},
  handleSubmit: () => {}
};

export default AbstractForm;
