import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";

function NavigationItem(props) {
  return (
    <Menu.Item
      icon={props.icon}
      as={Link}
      id={props.id}
      active={props.active}
      to={props.to}
      content={props.title}
      className={props.fancy && "fancy"}
    />
  );
}

NavigationItem.propTypes = {
  id: PropTypes.string,
  icon: PropTypes.string,
  active: PropTypes.bool,
  to: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  className: PropTypes.bool
};

export default NavigationItem;
