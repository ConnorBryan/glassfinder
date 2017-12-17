import React from "react";
import { BrowserRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import ReactDOM from "react-dom";
import "semantic-ui-css/semantic.min.css";

import registerServiceWorker from "./registerServiceWorker";
import routes from "./config/routes";
import "./index.css";

ReactDOM.render((
  <BrowserRouter>
    {renderRoutes(routes)}
  </BrowserRouter>
), document.getElementById("root"));
registerServiceWorker();
