import React from "react";
import { Formik } from "formik";
import Yup from "yup";
import {
  Icon,
  Form,
  Divider,
  Segment,
  Button,
  Message,
  Dropdown
} from "semantic-ui-react";
import styled from "styled-components";

import { fancy } from "../../styles/snippets";

const Styles = styled.div`
  .button {
    ${fancy};
  }
`;

function AbstractFormField({
  field,
  values,
  touched,
  errors,
  handleChange,
  setFieldValue
}) {
  const inputProps = {
    ...field,
    error: !!(touched[field.name] && errors[field.name]),
    value: values[field.name],
    onChange: handleChange
  };
  const [, options] = inputProps.options || [];
  const inputTypes = {
    textarea: () => <Form.Field control="textarea" {...inputProps} />,
    select: () => (
      <Form.Field>
        <label>{inputProps.label}</label>
        <Dropdown
          placeholder={inputProps.placeholder}
          search
          selection
          value={inputProps.value}
          options={options}
          onChange={handleSelect}
        />
      </Form.Field>
    )
  };
  const handleSelect = (event, { value }) =>
    setFieldValue(inputProps.name, value);

  return (
    <Segment attached="bottom" color="blue" key={field.name}>
      {inputTypes[field.type] ? (
        inputTypes[field.type]()
      ) : (
        <Form.Input {...inputProps} />
      )}
      {touched[field.name] &&
      errors[field.name] && (
        <Message icon="warning sign" header={errors[field.name]} negative />
      )}
    </Segment>
  );
}

function AbstractForm({ fields, onSubmit }) {
  const initialValues = fields.reduce(
    (values, field) => ({ ...values, [field.name]: field.value }),
    {}
  );

  const validationSchema = Yup.object().shape(
    fields.reduce(
      (schema, field) => ({ ...schema, [field.name]: field.validation }),
      {}
    )
  );

  return (
    <Formik
      {...{ initialValues, validationSchema, onSubmit }}
      render={({
        values,
        errors,
        touched,
        setFieldValue,
        handleChange,
        handleSubmit,
        handleReset,
        isSubmitting
      }) => (
        <Styles>
          <Divider hidden />
          <Form onSubmit={handleSubmit}>
            <Segment.Group stacked>
              {fields.map((field, index) => (
                <AbstractFormField
                  key={index}
                  field={field}
                  {...{ values, touched, errors, handleChange, setFieldValue }}
                />
              ))}
              <Segment attached="bottom" color="blue">
                <Button.Group fluid>
                  <Button type="submit" disabled={isSubmitting} primary>
                    Send <Icon name="send outline" />
                  </Button>
                  <Button.Or />
                  <Button
                    icon="refresh"
                    onClick={handleReset}
                    content="Reset"
                    disabled={isSubmitting}
                  />
                </Button.Group>
              </Segment>
            </Segment.Group>
          </Form>
        </Styles>
      )}
    />
  );
}

export default AbstractForm;
