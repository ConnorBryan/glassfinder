import React from "react";
import ReactDOM from "react-dom";

import Client from "./client";
import Admin from "./admin";
import "./semantic/dist/semantic.min.css";
import "./index.css";

const isAdmin = process.env.REACT_APP_IS_ADMIN;
const Main = isAdmin ? Admin : Client;

ReactDOM.render(React.createElement(Main), document.getElementById("root"));
