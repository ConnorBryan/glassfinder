import React from "react";
import ReactDOM from "react-dom";

import * as config from "./config";
import Client from "./client";
import Admin from "./admin";
import "./semantic/dist/semantic.min.css";
import "./index.css";

const Main = config.IS_ADMIN ? Admin : Client;

ReactDOM.render(React.createElement(Main), document.getElementById("root"));
