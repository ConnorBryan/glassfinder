import config from "../../config";
import withPageHeader from "../../atomic/withPageHeader";
import SigninForm from "../../forms/Signin";
import SignupForm from "../../forms/Signup";

export const Signin = withPageHeader(config.pageHeaders.signin, SigninForm);
export const Signup = withPageHeader(config.pageHeaders.signup, SignupForm);
