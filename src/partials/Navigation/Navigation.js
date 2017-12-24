import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Responsive, Menu, Icon } from "semantic-ui-react";
import styled from "styled-components";

import config from "../../config";

function NavigationItem(props) {
  return (
    <Menu.Item
      icon={props.icon}
      as={Link}
      active={props.match === props.to}
      to={props.to}
      content={props.title}
      className={props.fancy && "fancy"}
    />
  );
}

function Navigation(props) {
  return (
    <Menu attached="top" compact color={config.color}>
      <NavigationItem
        fancy
        match={props.location.pathname}
        to="/"
        title={config.appName}
      />
      {config.socialMedia.map(({ to, icon }) => (
        <Menu.Item key={icon} as="a" href={to} icon={icon} />
      ))}
      <Responsive
        as={Menu.Menu}
        maxWidth={Responsive.onlyMobile.maxWidth}
        position="right"
      >
        <Menu.Item as={SemiFancy}>
          <Icon name="bars" /> Menu
        </Menu.Item>
      </Responsive>
      <Responsive
        as={Menu.Menu}
        minWidth={Responsive.onlyMobile.maxWidth}
        position="right"
      >
        {config.navigation.map(item => (
          <NavigationItem
            key={item.key}
            match={props.location.pathname}
            {...item}
          />
        ))}
      </Responsive>
    </Menu>
  );
}

export default withRouter(Navigation);

/* Styling */

const SemiFancy = styled.div`letter-spacing: 0.1rem;`;
