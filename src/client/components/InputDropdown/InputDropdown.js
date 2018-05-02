import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Button, Loader } from "semantic-ui-react";
import Aux from "react-aux";

import { fancy } from "../../styles/snippets";

const Styles = styled.div`
  .empty-collection-message-wrapper {
    display: flex;
    align-items: center;
    height: ${props => props.height};
    font-size: 1.4rem;
  }

  .input-label {
    font-size: 1.7rem;
    ${fancy};
  }

  .input-description {
    font-size: 1.2rem;
    margin: 1rem 0 2rem 0;
    color: white;
  }

  .wrapper {
    width: ${props => props.width};
    height: ${props => props.height};
    display: flex;
    align-items: center;

    > div {
      width: 100%;
      height: 100%;
    }
  }

  .input-wrapper {
    position: relative;
  }

  input {
    width: 100%;
    height: 100%;
    border: 1px solid #555;
    background: black;
    color: white;
    font-size: 1.66rem;
    letter-spacing: 0.15rem;
    padding: 1rem;
  }

  button {
    margin: 0 !important;
    width: 5rem !important;
    height: ${props => `${props.height} !important`};
    border: 1px solid #555 !important;
    border-left: none !important;
    border-radius: 0 !important;
  }

  .loading-dropdown {
    position: absolute;
    top: ${props => props.height};
    width: 100%;
    border: 1px solid #555;
    background: black;
    color: white;
    height: 115px;
  }

  ul {
    position: absolute;
    top: ${props => props.height};
    width: 100%;
    list-style-type: none;
    border: 1px solid #555;
    background: black;
    color: white;
    margin: 0;
    padding: 0;
    max-height: 230px;
    overflow-y: auto;
    z-index: 5;

    li {
      margin: 0;
      padding: 2rem;
      transition: background 0.33s ease-in;
      font-size: 1.3rem;
      border-bottom: 1px solid rgba(45, 45, 45, 0.6);

      &:hover {
        background: #222;
        cursor: pointer;
      }
    }
  }
`;

export default class InputDropdown extends Component {
  static propTypes = {
    inputLabel: PropTypes.string,
    inputDescription: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
    minimumCharactersForDropdown: PropTypes.number,
    valueProperty: PropTypes.string,
    labelProperty: PropTypes.string,
    placeholder: PropTypes.string,
    filtered: PropTypes.bool,
    hideIfEmptyCollection: PropTypes.bool,
    emptyCollectionMessage: PropTypes.string,
    service: PropTypes.func,
    additionalClearButtonFunctionality: PropTypes.func,
    onSubmit: PropTypes.func.isRequired,
    onNoMatchSubmit: PropTypes.func
  };

  static defaultProps = {
    inputLabel: "",
    inputDescription: "",
    width: "40rem",
    height: "5rem",
    minimumCharactersForDropdown: 0,
    valueProperty: "id",
    labelProperty: "name",
    placeholder: "",
    filtered: true,
    hideIfEmptyCollection: false,
    emptyCollectionMessage: "",
    service: () => Promise.resolve([]),
    additionalClearButtonFunctionality: () => {},
    onNoMatchSubmit: () => {}
  };

  state = {
    value: "",
    dropdownVisible: false,
    isLoading: true,
    isFocused: false,
    collection: []
  };

  input = null;

  componentDidMount() {
    this.loadCollection();
  }

  componentDidUpdate() {
    this.checkDropdownStatus();
  }

  setValue = (value, submitAfterSetting = false) =>
    this.setState({ value }, () => submitAfterSetting && this.handleSubmit());

  focus = () => this.setState({ isFocused: true });

  blur = () => this.setState({ isFocused: false });

  revealDropdown = () => this.setState({ dropdownVisible: true });

  hideDropdown = () => this.setState({ dropdownVisible: false });

  handleInputChange = ({ target: { value } }) => this.setValue(value);

  handleInputFocus = () => setTimeout(this.focus, 200);

  handleInputBlur = () => setTimeout(this.blur, 200);

  handleInputKeydown = ({ key }) => {
    const { isFocused } = this.state;

    if (key === "Enter") {
      this.blur();
      this.handleSubmit();
    }

    if (!isFocused) {
      this.focus();
    }
  };

  handleSubmit = e => {
    const { onSubmit, onNoMatchSubmit } = this.props;
    const { value: label } = this.state;
    const labelToValueDictionary = this.getLabelToValueDictionary();
    const valueToSubmit = labelToValueDictionary[label];

    e && e.preventDefault();

    if (typeof valueToSubmit === "undefined") {
      onNoMatchSubmit(label);
      return;
    }

    setTimeout(() => onSubmit(valueToSubmit, label), 0);
  };

  handleClear = e => {
    const { additionalClearButtonFunctionality } = this.props;

    e.preventDefault();

    this.setValue("");

    additionalClearButtonFunctionality();
  };

  checkDropdownStatus = () => {
    const { minimumCharactersForDropdown } = this.props;
    const { value, dropdownVisible } = this.state;
    const dropdownShouldBeVisible =
      value.length >= minimumCharactersForDropdown;

    if (dropdownShouldBeVisible && !dropdownVisible) {
      this.revealDropdown();
    } else if (!dropdownShouldBeVisible && dropdownVisible) {
      this.hideDropdown();
    }
  };

  loadCollection = async () => {
    const { service } = this.props;
    const collection = await service();

    this.setState({
      collection,
      isLoading: false
    });
  };

  renderDropdownItems = () =>
    (this.props.filtered
      ? this.getFilteredCollection()
      : this.state.collection
    ).map((item, index) => (
      <li
        key={index}
        onClick={() => this.setValue(item[this.props.labelProperty], true)}
      >
        {item[this.props.labelProperty]}
      </li>
    ));

  getFilteredCollection = () =>
    this.state.collection.filter(item =>
      item[this.props.labelProperty].includes(this.state.value)
    );

  getLabelToValueDictionary = () =>
    this.state.collection.reduce((prev, next) => {
      const { labelProperty, valueProperty } = this.props;

      prev[next[labelProperty]] = next[valueProperty];

      return prev;
    }, Object.create(null));

  render() {
    const {
      inputLabel,
      inputDescription,
      service,
      onSubmit,
      placeholder,
      hideIfEmptyCollection,
      emptyCollectionMessage,
      ...styles
    } = this.props;
    const {
      value,
      isLoading,
      isFocused,
      dropdownVisible,
      collection
    } = this.state;
    const dropdownContent = isLoading ? (
      <section className="loading-dropdown">
        <Loader active />
      </section>
    ) : (
      <ul>{this.renderDropdownItems()}</ul>
    );
    const emptyAfterAttemptingToLoad =
      hideIfEmptyCollection && !isLoading && collection.length === 0;

    return (
      <Styles {...styles}>
        {emptyAfterAttemptingToLoad ? (
          <div className="empty-collection-message-wrapper">
            <em>{emptyCollectionMessage}</em>
          </div>
        ) : (
          <Aux>
            {inputLabel && <label className="input-label">{inputLabel}</label>}
            {inputDescription && (
              <section className="input-description">
                {inputDescription}
              </section>
            )}
            <div className="wrapper">
              <div className="input-wrapper">
                <input
                  type="text"
                  placeholder={placeholder}
                  value={value}
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                  onBlur={this.handleInputBlur}
                  onKeyDown={this.handleInputKeydown}
                  onClick={this.handleInputFocus}
                />
                {isFocused &&
                  dropdownVisible &&
                  collection.length > 0 &&
                  dropdownContent}
              </div>
              <Button
                secondary
                title="Submit"
                icon="chevron right"
                onClick={this.handleSubmit}
              />
              <Button
                secondary
                title="Clear"
                icon="trash"
                onClick={this.handleClear}
              />
            </div>
          </Aux>
        )}
      </Styles>
    );
  }
}
