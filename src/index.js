import React from "react";
import { BrowserRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import ReactDOM from "react-dom";
import "semantic-ui-css/semantic.min.css";

import registerServiceWorker from "./registerServiceWorker";
import ScrollToTop from "./components/ScrollToTop";
import routes from "./routes";
import "./index.css";

ReactDOM.render(
  <BrowserRouter>
    <ScrollToTop>{renderRoutes(routes)}</ScrollToTop>
  </BrowserRouter>,
  document.getElementById("root")
);
registerServiceWorker();
