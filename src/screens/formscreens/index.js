import config from "../../config";
import withPageHeader from "../../atomic/withPageHeader";
import SigninForm from "../../slices/account/forms/Signin";
import SignupForm from "../../slices/account/forms/Signup";
import UpdatePasswordForm from "../../slices/account/forms/UpdatePassword";

export const Signin = withPageHeader(config.pageHeaders.signin, SigninForm);
export const Signup = withPageHeader(config.pageHeaders.signup, SignupForm);
export const UpdatePassword = withPageHeader(
  config.pageHeaders.updatePassword,
  UpdatePasswordForm
);
