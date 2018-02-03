import React from "react";
import { Formik } from "formik";
import Yup from "yup";
import {
  Form,
  Divider,
  Menu,
  Segment,
  Message,
  Dropdown
} from "semantic-ui-react";
import styled from "styled-components";

import { fancy, evenBiggerText } from "../../styles/snippets";

const Styles = styled.div`
  label {
    ${fancy};
    ${evenBiggerText};
    margin-bottom: 1.5rem !important;
  }

  input {
    border: 1px solid white !important;
  }

  .item {
    ${fancy};
  }

  .menu {
    border: 1px solid white !important;
  }

  .fieldview {
    padding: 0 !important;
  }

  .seethrough input,
  .textareaWrapper textarea {
    color: white !important;
    background-color: transparent !important;
    border: 1px solid white !important;

    &:focus {
      border: 1px solid white !important;
    }
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
    textarea: () => (
      <Form.Field
        className="textareaWrapper"
        control="textarea"
        {...inputProps}
      />
    ),
    select: () => (
      <Form.Field>
        <label>{inputProps.label}</label>
        <Dropdown
          inverted
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
    <Segment key={field.name} inverted>
      {inputTypes[field.type] ? (
        inputTypes[field.type]()
      ) : (
        <Form.Input className="seethrough" {...inputProps} />
      )}
      {touched[field.name] &&
      errors[field.name] && (
        <Message icon="warning sign" header={errors[field.name]} negative />
      )}
    </Segment>
  );
}

function AbstractForm({ fields, onSubmit, actions, sendText }) {
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
          <Form onSubmit={handleSubmit} inverted>
            <Segment attached="top" className="fieldview">
              <Segment.Group>
                {fields.map((field, index) => (
                  <AbstractFormField
                    key={index}
                    {...{
                      field,
                      values,
                      touched,
                      errors,
                      handleChange,
                      setFieldValue
                    }}
                  />
                ))}
              </Segment.Group>
            </Segment>
            <Divider hidden />
            <Menu attached="top" inverted widths={2}>
              <Menu.Item
                icon="send outline"
                content={sendText || "Send"}
                onClick={handleSubmit}
                disabled={isSubmitting}
              />
              <Menu.Item
                icon="refresh"
                onClick={handleReset}
                content="Reset"
                disabled={isSubmitting}
              />
            </Menu>
            {actions &&
              actions.map((action, index) => (
                <Menu attached="bottom" inverted widths={1}>
                  <Menu.Item {...action} />
                </Menu>
              ))}
          </Form>
        </Styles>
      )}
    />
  );
}

export default AbstractForm;
