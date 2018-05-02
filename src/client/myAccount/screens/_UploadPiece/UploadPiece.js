import React, { Component } from "react";
import { Formik, Field } from "formik";
import styled from "styled-components";
import { Container, Segment, Dropdown, Loader } from "semantic-ui-react";

import API from "../../../services";
import ImageUpload from "../../../components/ImageUpload";
import InputDropdown from "../../../components/InputDropdown";

/** */
export class InputWithDropdown extends Component {
  render() {
    const { term, onChange, options } = this.props;

    return (
      <Dropdown
        placeholder={`Enter ${term}`}
        fluid
        search
        onChange={(event, data) => onChange(data.value)}
        noResultsMessage={`No ${term}s found. Enter the artist in in the input below.`}
        options={options}
      />
    );
  }
}

/** */

const Styles = styled.div`
  margin: 0 10vw;

  pre {
    color: white;
  }

  fieldset {
    border: none;

    label {
      display: block;
      color: white;
    }
  }

  .form-segment {
    padding: 2rem !important;
    border: 1px solid #555 !important;
    margin-bottom: 3rem !important;
  }
`;

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

window.GLASSFINDER_GLOBAL_SHARE = {
  imageUpload: null
};

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
    const finalValues = {
      ...values,
      image: window.GLASSFINDER_GLOBAL_SHARE.imageUpload || values.image || ""
    };

    return isLastPage
      ? onSubmit(finalValues)
      : this.next(finalValues) || bag.setSubmitting(false);
  };

  render() {
    const { children } = this.props;
    const { page, values } = this.state;
    const activePage = React.Children.toArray(children)[page];
    const isLastPage = page === React.Children.count(children) - 1;

    return (
      <Styles>
        <Formik
          className="Wizard"
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
      </Styles>
    );
  }
}

export default class UploadPiece extends Component {
  formatData = data =>
    data.map(datum => ({
      key: datum.name,
      value: datum.id,
      text: datum.name
    }));

  render() {
    return (
      <Container>
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
            onSubmit={values => {
              sleep(300).then(() => {
                const {
                  account: { id }
                } = this.props;
                const finalValues = { ...values, id };
                // window.alert(JSON.stringify(values, null, 2));
                // actions.setSubmitting(false);
                API.uploadPiece(finalValues)
                  .then(() => console.log("Done!"))
                  .catch(err => console.error(err));
              });
            }}
          >
            {/* Page 1: Basic Information */}
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
            {/* Page 2: Association */}
            <Wizard.Page>
              <Segment className="form-segment" inverted>
                <Field
                  name="artist"
                  render={renderProps => {
                    const handleSubmit = artist =>
                      renderProps.form.setValues({
                        ...renderProps.form.values,
                        artist,
                        artistEntry: ""
                      });
                    const handleNoMatchSubmit = artistEntry =>
                      renderProps.form.setValues({
                        ...renderProps.form.values,
                        artist: "",
                        artistEntry
                      });
                    const additionalClearButtonFunctionality = () =>
                      renderProps.form.setValues({
                        ...renderProps.form.values,
                        artist: "",
                        artistEntry: ""
                      });

                    return (
                      <InputDropdown
                        inputLabel="Artist"
                        inputDescription="Select an artist with a Glassfinder account to provide credit and to have the piece show up on their profile. If they do not have a Glassfinder account, simply enter their name and press <Enter>."
                        placeholder="Select an artist."
                        service={API.retrieveAllArtists}
                        onSubmit={handleSubmit}
                        onNoMatchSubmit={handleNoMatchSubmit}
                        additionalClearButtonFunctionality={
                          additionalClearButtonFunctionality
                        }
                      />
                    );
                  }}
                />
              </Segment>
              <Segment className="form-segment" inverted>
                <Field
                  name="brand"
                  render={renderProps => {
                    const handleSubmit = brand =>
                      renderProps.form.setValues({
                        ...renderProps.form.values,
                        brand,
                        brandEntry: ""
                      });
                    const handleNoMatchSubmit = brandEntry =>
                      renderProps.form.setValues({
                        ...renderProps.form.values,
                        brand: "",
                        brandEntry
                      });
                    const additionalClearButtonFunctionality = () =>
                      renderProps.form.setValues({
                        ...renderProps.form.values,
                        brand: "",
                        brandEntry: ""
                      });

                    return (
                      <InputDropdown
                        inputLabel="Brand"
                        inputDescription="Select a brand with a Glassfinder account to provide further information for users. If the brand does not have a Glassfinder account, simply enter their name and press <Enter>."
                        placeholder="Select a brand."
                        service={API.retrieveAllBrands}
                        onSubmit={handleSubmit}
                        onNoMatchSubmit={handleNoMatchSubmit}
                        additionalClearButtonFunctionality={
                          additionalClearButtonFunctionality
                        }
                      />
                    );
                  }}
                />
              </Segment>
            </Wizard.Page>
            {/* Page 3: Association */}
            <Wizard.Page>
              <ImageUpload
                onSubmit={image =>
                  (window.GLASSFINDER_GLOBAL_SHARE.imageUpload = image)
                }
                initialImage="https://placehold.it/300x300"
              />
            </Wizard.Page>
          </Wizard>
        </div>
      </Container>
    );
  }
}
