import * as formatters from "../../../client/validators";

export default [
  {
    name: "email",
    type: "email",
    label: "Email",
    placeholder: "Enter the user's email",
    validation: formatters.email
  }
];
