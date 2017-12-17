import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Menu } from "semantic-ui-react";

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
    <Menu>
      <NavigationItem
        fancy
        match={props.location.pathname}
        to="/"
        title={config.appName}
      />
      <Menu.Menu position="right">
        {config.navigationItems.map(item => (
          <NavigationItem
            key={item.key}
            match={props.location.pathname}
            {...item}
          />
        ))}
      </Menu.Menu>
    </Menu>
  );
}

export default withRouter(Navigation);
