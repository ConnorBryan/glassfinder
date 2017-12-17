import config from "../../config";
import withPageHeader from "../../atomic/withPageHeader";
import SigninForm from "../../slices/account/forms/Signin";
import SignupForm from "../../slices/account/forms/Signup";

export const Signin = withPageHeader(config.pageHeaders.signin, SigninForm);
export const Signup = withPageHeader(config.pageHeaders.signup, SignupForm);
