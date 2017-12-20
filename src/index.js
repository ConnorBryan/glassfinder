import React from "react";
import { Provider } from "react-redux";
import { ConnectedRouter, routerMiddleware } from "react-router-redux";
import { renderRoutes } from "react-router-config";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import createHistory from "history/createBrowserHistory";
import "semantic-ui-css/semantic.min.css";

import reducer from "./redux";
import registerServiceWorker from "./registerServiceWorker";
import ScrollToTop from "./components/ScrollToTop";
import routes from "./routes";
import "./index.css";

const history = createHistory();

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk, routerMiddleware(history))
);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ScrollToTop>{renderRoutes(routes)}</ScrollToTop>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
