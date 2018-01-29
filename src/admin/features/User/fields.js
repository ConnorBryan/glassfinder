import Yup from "yup";

import * as formatters from "../../../main/validators";

export default [
  {
    name: "email",
    type: "email",
    label: "Email",
    placeholder: "Enter the user's email",
    validation: formatters.email
  }
];
