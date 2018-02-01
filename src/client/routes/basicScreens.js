/**
 * @overview
 * "Basic screens" are screens that do not require authorization
 * and are unrelated to the core functionality of the product.
 */
import Home from "../screens/Home";
import About from "../screens/About";
import Help from "../components/Help";
import Updates from "../components/Updates";
import Contact from "../components/Contact";
import Signin from "../components/Signin";
import Signup from "../components/Signup";
import Verification from "../components/Verification";

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
