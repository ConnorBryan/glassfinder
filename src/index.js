import React from "react";
// import { Provider } from "react-redux";
// import { ConnectedRouter, routerMiddleware } from "react-router-redux";
// import { renderRoutes } from "react-router-config";
import ReactDOM from "react-dom";
// import { createStore, applyMiddleware } from "redux";
// import thunk from "redux-thunk";
// import createHistory from "history/createBrowserHistory";
import "semantic-ui-css/semantic.min.css";

// import reducer from "./redux";
// import registerServiceWorker from "./registerServiceWorker";
// import SidebarDaemon from "./components/SidebarDaemon";
// import ScrollToTop from "./components/ScrollToTop";
// import routes from "./routes";
// import "./index.css";

import Main from "./main";

ReactDOM.render(<Main />, document.getElementById("root"));

// const history = createHistory();

// const store = createStore(
//   reducer,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
//   applyMiddleware(routerMiddleware(history), thunk)
// );

// ReactDOM.render(
//   <Provider store={store}>
//     <ConnectedRouter history={history}>
//       <SidebarDaemon>
//         <ScrollToTop>{renderRoutes(routes)}</ScrollToTop>
//       </SidebarDaemon>
//     </ConnectedRouter>
//   </Provider>,
//   document.getElementById("root")
// );
// registerServiceWorker();
