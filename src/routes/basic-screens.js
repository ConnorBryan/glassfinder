import Home from "../screens/Home";
import Updates from "../screens/Updates";
import Help from "../screens/Help";
import About from "../screens/About";
import Contact from "../screens/Contact";
import TermsAndConditions from "../screens/TermsAndConditions";
import PrivacyPolicy from "../screens/PrivacyPolicy";
import Verify from "../screens/Verify";

export default [
  {
    path: "/",
    exact: true,
    component: Home
  },
  {
    path: "/updates",
    exact: true,
    component: Updates
  },
  {
    path: "/help",
    exact: true,
    component: Help
  },
  {
    path: "/about",
    exact: true,
    component: About
  },
  {
    path: "/contact",
    exact: true,
    component: Contact
  },
  {
    path: "/terms-and-conditions",
    exact: true,
    component: TermsAndConditions
  },
  {
    path: "/privacy-policy",
    exact: true,
    component: PrivacyPolicy
  },
  {
    path: "/verify/:id?/:verificationCode?",
    exact: true,
    component: Verify
  }
];
