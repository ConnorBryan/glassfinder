import React from "react";
import { withFormik } from "formik";
import Yup from "yup";
import { Form, Container, Header } from "semantic-ui-react";

/*
{
  email,
  emailAgain,
  password,
  passwordAgain,

}

*/

export const errorCondition = (errors, touched, field) =>
  touched[field] && errors[field];

function SignUpForm(props) {
  const {
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

  const handlers = {
    onChange: handleChange,
    onBlur: handleBlur
  };
  const condition = errorCondition.bind(this, errors, touched);
  const emailError = condition("email");
  const emailAgainError = condition("emailAgain");
  const passwordError = condition("password");
  const passwordAgainError = condition("passwordAgain");

  return (
    <Form size='tiny'>
      <Header as="h2" content="Sign up" />

      <Form.Input
        label="Email"
        type="email"
        name="email"
        size='tiny'
        value={values.email}
        {...handlers}
      />
      {emailError && <div>{errors.email}</div>}

      <Form.Input
        label="Email, again"
        type="email"
        name="emailAgain"
        size='tiny'
        value={values.emailAgain}
        {...handlers}
      />
      {emailAgainError && <div>{errors.emailAgain}</div>}

      <Form.Input
        label="Password"
        type="password"
        name="password"
        size='tiny'
        value={values.password}
        {...handlers}
      />
      {passwordError && <div>{errors.password}</div>}

      <Form.Input
        label="Password, again"
        type="password"
        size='tiny'
        name="passwordAgain"
        value={values.passwordAgain}
        {...handlers}
      />
      {passwordAgainError && <div>{errors.passwordAgain}</div>}

      <Form.Button content="Submit" onClick={handleSubmit} />
      <Form.Button content="Reset" onClick={handleReset} />
    </Form>
  );
}

export default withFormik({
  mapPropsToValues: props => ({
    email: props.user.email,
    emailAgain: props.user.emailAgain,
    password: props.user.password,
    passwordAgain: props.user.passwordAgain
  }),
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required."),
    emailAgain: Yup.mixed().test("match", "Emails must match", function(email) {
      return email === this.options.parent.email;
    }),
    password: Yup.string()
      .min(8, "Your password must be at least 8 characters.")
      .max(128, "Your password cannot exceed 128 characters.")
      .required("Password is required."),
    passwordAgain: Yup.mixed().test("match", "Passwords must match", function(
      password
    ) {
      return password === this.options.parent.password;
    })
  }),
  handleSubmit: (values, { setSubmitting }) => {
    alert(JSON.stringify(values, null, 2));
  }
})(SignUpForm);
