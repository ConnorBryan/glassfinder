import MyAccount from "./MyAccount";
import { Signin, Signup, UpdatePassword } from "../../screens/formscreens";

export default [
  {
    path: "/sign-in",
    exact: true,
    component: Signin
  },
  {
    path: "/sign-up",
    exact: true,
    component: Signup
  },
  {
    path: "/my-account",
    exact: true,
    component: MyAccount
  },
  {
    path: "/update-password",
    exact: true,
    component: UpdatePassword
  }
];
