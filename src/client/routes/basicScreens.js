/**
 * @overview
 * "Basic screens" are screens that do not require authorization
 * and are unrelated to the core functionality of the product.
 */
import Home from "../screens/Home";
import About from "../screens/About";
import Help from "../screens/Help";
import Updates from "../screens/Updates";
import Contact from "../screens/Contact";
import Signin from "../screens/Signin";
import Signup from "../screens/Signup";
import Verification from "../screens/Verification";

export default [
  {
    path: "/",
    exact: true,
    component: Home
  },
  {
    path: "/about",
    exact: true,
    component: About
  },
  {
    path: "/help",
    exact: true,
    component: Help
  },
  {
    path: "/updates",
    exact: true,
    component: Updates
  },
  {
    path: "/contact",
    exact: true,
    component: Contact
  },
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
  // {
  //   path: "/terms-and-conditions",
  //   exact: true,
  //   component: TermsAndConditions
  // },
  // {
  //   path: "/privacy-policy",
  //   exact: true,
  //   component: PrivacyPolicy
  // },
  {
    path: "/verification/:id?/:verificationCode?",
    exact: true,
    component: Verification
  }
];
