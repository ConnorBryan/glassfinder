import React from "react";
import { Route } from "react-router-dom";

import BASIC_SCREENS from "./basic-screens";
import FEATURE_SCREENS from "./feature-screens";
import ACCOUNT_SCREENS from "./account-screens";

export const RecursiveRoutes = route => (
  <Route
    path={route.path}
    render={props => (
      <route.component
        {...props}
        {...route.additionalProps}
        routes={route.routes}
      />
    )}
  />
);

export default [...BASIC_SCREENS, ...FEATURE_SCREENS, ...ACCOUNT_SCREENS];
