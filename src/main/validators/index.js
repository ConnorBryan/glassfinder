import Yup from "yup";

export const email = Yup.string()
  .email("A valid email is required.")
  .required("A valid email is required.");

export const password = Yup.string()
  .min(6, "Password must be at least 6 characters.")
  .max(128, "Password cannot exceed 128 characters.")
  .required("Password is required.");

export const passwordAgain = Yup.mixed().test(
  "match",
  "Passwords must match",
  function(currentPassword) {
    return currentPassword === this.options.parent.newPassword;
  }
);

export const phone = Yup.string()
  .matches(
    /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/,
    "A valid phone number is required."
  )
  .required("A valid phone number is required.");

export const description = Yup.string().required(
  "Come on, people want to know what you're all about!"
);

export const picture = Yup.object().required("An image is required.");
