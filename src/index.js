import React from "react";
import ReactDOM from "react-dom";

import Main from "./main";
import Admin from "./admin";
import "./semantic/dist/semantic.min.css";
import "./index.css";

const Component = true ? Admin : Main;

ReactDOM.render(<Component />, document.getElementById("root"));
