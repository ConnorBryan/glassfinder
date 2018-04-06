import React, { Component } from "react";
import { Formik, Field } from "formik";

const sleep = ms => new Promise(r => setTimeout(r, ms));
const required = value => (value ? undefined : "Required");

function Error({ name }) {
  return (
    <Field
      {...{ name }}
      render={({ form: { touched, errors } }) =>
        touched[name] && errors[name] ? <span>{errors[name]}</span> : null
      }
    />
  );
}

class Wizard extends Component {
  static Page = ({ children }) => children;

  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      values: props.initialValues
    };
  }

  next = values =>
    this.setState(prevState => ({
      page: Math.min(prevState.page + 1, this.props.children.length - 1),
      values
    }));

  previous = () =>
    this.setState(prevState => ({
      page: Math.max(prevState.page - 1, 0)
    }));

  validate = values => ({});

  handleSubmit = (values, bag) => {
    const { children, onSubmit } = this.props;
    const { page } = this.state;
    const isLastPage = page === React.Children.count(children) - 1;

    return isLastPage
      ? onSubmit(values)
      : this.next(values) || bag.setSubmitting(false);
  };

  render() {
    const { children } = this.props;
    const { page, values } = this.state;
    const activePage = React.Children.toArray(children)[page];
    const isLastPage = page === React.Children.count(children) - 1;

    return (
      <Formik
        initialValues={values}
        enableReinitialize={false}
        validate={this.validate}
        onSubmit={this.handleSubmit}
        render={({ values, handleSubmit, isSubmitting, handleReset }) => (
          <form onSubmit={handleSubmit}>
            {activePage}
            <section className="buttons">
              {page > 0 && (
                <button type="button" onClick={this.previous}>
                  Previous
                </button>
              )}
              {!isLastPage && <button type="submit">Next</button>}
              {isLastPage && (
                <button type="submit" disabled={isSubmitting}>
                  Finish
                </button>
              )}
            </section>
            <pre>{JSON.stringify(values, null, 2)}</pre>
          </form>
        )}
      />
    );
  }
}

export default class UploadPiece extends Component {
  render() {
    return (
      <div className="UploadPiece">
        <Wizard
          initialValues={{
            name: "",
            description: "",
            maker: "",
            price: "",
            location: "",

            artist: "",
            artistEntry: "",
            brand: "",
            brandEntry: "",

            image: ""
          }}
          onSubmit={(values, actions) => {
            sleep(300).then(() => {
              window.alert(JSON.stringify(values, null, 2));
              actions.setSubmitting(false);
            });
          }}
        >
          <Wizard.Page>
            <fieldset>
              <label>Name</label>
              <Field
                name="name"
                component="input"
                type="text"
                placeholder="Name"
                validate={required}
              />
            </fieldset>
            <fieldset>
              <label>Description</label>
              <Field
                name="description"
                component="textarea"
                placeholder="Description"
                validate={required}
              />
            </fieldset>
            <fieldset>
              <label>Maker</label>
              <Field
                name="maker"
                component="input"
                type="text"
                placeholder="Maker"
                validate={required}
              />
            </fieldset>
            <fieldset>
              <label>Price</label>
              <Field
                name="price"
                component="input"
                type="number"
                placeholder="13.37"
                validate={required}
              />
            </fieldset>
            <fieldset>
              <label>Location</label>
              <Field
                name="location"
                component="input"
                type="text"
                placeholder="Location"
                validate={required}
              />
            </fieldset>
          </Wizard.Page>
          <Wizard.Page>
            <fieldset>
              <label>Name</label>
              <Field
                name="name"
                component="input"
                type="text"
                placeholder="Name"
                validate={required}
              />
            </fieldset>
          </Wizard.Page>
          <Wizard.Page>
            <fieldset>
              <label>Maker</label>
              <Field
                name="maker"
                component="input"
                type="text"
                placeholder="Maker"
                validate={required}
              />
            </fieldset>
          </Wizard.Page>
        </Wizard>
      </div>
    );
  }
}
