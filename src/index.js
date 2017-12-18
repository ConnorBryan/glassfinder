import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import ReactDOM from "react-dom";
import "semantic-ui-css/semantic.min.css";

import store from "./redux";
import registerServiceWorker from "./registerServiceWorker";
import ScrollToTop from "./components/ScrollToTop";
import routes from "./routes";
import "./index.css";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ScrollToTop>{renderRoutes(routes)}</ScrollToTop>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
