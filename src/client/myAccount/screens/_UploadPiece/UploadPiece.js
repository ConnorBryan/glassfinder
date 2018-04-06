import React, { Component } from "react";
import { Form, Field, Formik } from "formik";

/**
 * name
 * description
 * maker
 * price
 * location
 *
 * image
 *
 * artistEntry
 * artistId
 * brandEntry
 * brandId
 */

export default class UploadPiece extends Component {
  state = {
    page: 0,
    values: {}
  };

  next = values =>
    this.setState(prevState => ({
      page: prevState.page + 1 < 3 ? prevState.page + 1 : 2,
      values: { ...prevState.values, ...values }
    }));

  previous = () =>
    this.setState(prevState => ({
      page: prevState.page - 1 > 0 ? prevState.page - 1 : 0
    }));

  initialValues = {
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
  };

  handleSubmit = values => {
    const { page } = this.state;

    if (page === 2) {
      const { page, values } = this.state;
      console.log("Submitting values", values);
    } else {
      this.next(values);
    }
  };

  renderBasicsForm = ({ handleChange, handleSubmit }) => (
    <Form>
      <fieldset>
        <label htmlFor="name">Name</label>
        <Field name="name" type="text" />
      </fieldset>
      <fieldset>
        <label htmlFor="descriptipn">Description</label>
        <textarea name="description" onChange={handleChange} />
      </fieldset>
      <fieldset>
        <label htmlFor="maker">Maker</label>
        <Field name="maker" type="text" />
      </fieldset>
      <fieldset>
        <label htmlFor="price">Price</label>
        <Field name="price" type="number" />
      </fieldset>
      <fieldset>
        <label htmlFor="location">Location</label>
        <Field name="location" type="text" />
      </fieldset>
      <button type="submit" onClick={handleSubmit}>
        Associations
      </button>
    </Form>
  );

  renderAssociationForm = ({ handleSubmit }) => (
    <Form>
      <fieldset />
      <button onClick={this.previous}>Basic Information</button>
      <button type="submit" onClick={handleSubmit}>
        Image
      </button>
    </Form>
  );

  renderImageForm = ({ handleSubmit }) => (
    <Form>
      <fieldset />
      <button onClick={this.previous}>Associations</button>
      <button type="submit" onClick={handleSubmit}>
        Finish
      </button>
    </Form>
  );

  render() {
    const { page } = this.state;
    const renderers = [
      this.renderBasicsForm,
      this.renderAssociationForm,
      this.renderImageForm
    ];
    const render = renderers[page];

    return (
      <Formik
        initialValues={this.initialValues}
        onSubmit={this.handleSubmit}
        render={render}
      />
    );
  }
}
