import React from "react";
import { Route } from "react-router-dom";

import BASIC_SCREENS from "./basicScreens";
import FEATURE_SCREENS from "./featureScreens";
import ACCOUNT_SCREENS from "./accountScreens";

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
