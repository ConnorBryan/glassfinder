/**
 * I S O M O R P H I C
 *    C O N F I G U R A T I O N
 *        V A L U E S
 */
export const ENVIRONMENT = process.env.NODE_ENV || "development";
export const IS_ADMIN = !!process.env.REACT_APP_IS_ADMIN;
export const JWT_SECRET = process.env.JWT_SECRET;
export const TOKEN_EXPIRATION = process.env.TOKEN_EXPIRATION;
export const SALT_ROUNDS = process.env.SALT_ROUNDS;
export const USER_BUCKET = process.env.USER_BUCKET;
export const PIECE_BUCKET = process.env.PIECE_BUCKET;
export const SPACES_ENDPOINT = process.env.SPACES_ENDPOINT;
export const USER_IMAGES_SPACES_URL = process.env.USER_IMAGES_SPACES_URL;
export const PIECE_IMAGES_SPACES_URL = process.env.PIECE_IMAGES_SPACES_URL;
export const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY;
export const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN;
export const API_ROOT = process.env.REACT_APP_API;
export const ADMIN_API_ROOT = `${API_ROOT}/admin`;
export const API_PORT = process.env.API_PORT || 6166;
export const URL = process.env.URL;
export const TRANSPORTER_EMAIL_ADDRESS = "do_not_reply@glassfinder.com";
export const CONTACT_EMAIL_ADDRESS = "cchromium@gmail.com";
export const PLACEHOLDER_IMAGE = "https://placehold.it/400x400";
export const PLACEHOLDER_SITE = "https://google.com";
export const GOOGLE_MAPS_GEOCODE_URL =
  "https://maps.googleapis.com/maps/api/geocode/json?address=";
export const CATASTROPHIC_ERROR_NOTIFICATION =
  "An unknown error occurred. we are sorry for any inconvenience.";
export const WELCOME_NOTIFICATION = "Welcome to Glassfinder!";
export const GOOD_SIGN_IN_NOTIFICATION = "Welcome back!";
export const BAD_SIGN_IN_NOTIFICATION =
  "Incorrect email or password. Please try again.";
export const SIGN_OUT_NOTIFICATION = "See ya later!";
export const BAD_SIGN_UP_NOTIFICATION = "That email was already taken.";
export const UPDATE_PASSWORD_SUCCESS_NOTIFICATION =
  "Your password was successfully updated.";
export const UPDATE_PASSWORD_FAILURE_NOTIFICATION =
  "Your password was unable to be updated. Please try again later.";
export const CONTACT_MESSAGE_SUCCESS_NOTIFICATION =
  "Thank you so much for your feedback!";
export const CONTACT_MESSAGE_FAILURE_NOTIFICATION =
  "Your message was unable to be sent. Please try again later.";
export const LINK_REQUEST_SUCCESS_NOTIFICATION =
  "A request has been made to the Glassfinder team. Please allow 24-48 hours for approval. Thank you for your patience.";
export const LINK_REQUEST_FAILURE_NOTIFICATION =
  "We were unable to send your request. Please try again later.";
export const BAD_ADDRESS_NOTIFICATION =
  "That address doesn't seem to be a real place. Please try again.";
export const UPDATE_INFORMATION_SUCCESS_NOTIFICATION =
  "Successfully updated your information.";
export const UPDATE_INFORMATION_FAILURE_NOTIFICATION =
  "We were unable to update your information. Please try again later.";
export const UPLOAD_IMAGE_SUCCESS_NOTIFICATION =
  "Successfully uploaded an image.";
export const UPLOAD_IMAGE_FAILURE_NOTIFICATION =
  "We were unable to upload your image. Please try again later.";
export const UPLOAD_PIECE_SUCCESS_NOTIFICATION =
  "Successfully uploaded a piece.";
export const UPLOAD_PIECE_FAILURE_NOTIFICATION =
  "We were unable to upload your piece. Please try again later.";
export const SIGN_UP_SUCCESS_NOTIFICATION =
  "Thanks for signing up! Check your email inbox for your activation link.";
export const RESEND_VERIFICATION_SUCCESS_NOTIFICATION =
  "We've sent you a new verification email. Please check your inbox shortly.";
export const RESEND_VERIFICATION_ERROR_NOTIFICATION =
  "We were unable to send you a new verification email. Are you sure you've signed up?";
export const MODEL_LIST = [
  "User",
  "Shop",
  "Artist",
  "Brand",
  "Piece",
  "About",
  "Help",
  "Update",
  "Verbiage",
  "LinkRequest"
];
export const NOTIFICATION_TIMEOUT = 4000;
export const MODEL_READ_LIMIT = 6;
export const POPULATION_COUNT = 10;
export const PIECE_COUNT = 3;
export const DEFAULT_PASSWORD = "111111";
export const LINK_TYPES = {
  SHOP: "SHOP",
  ARTIST: "ARTIST",
  BRAND: "BRAND",
  PIECE: "PIECE"
};
export const LINK_TYPES_TO_RESOURCES = {
  [LINK_TYPES.SHOP]: "shops",
  [LINK_TYPES.ARTIST]: "artists",
  [LINK_TYPES.BRANDS]: "brands",
  [LINK_TYPES.PIECES]: "pieces"
};
export const ICON_SET = {
  [LINK_TYPES.SHOP]: "shopping cart",
  [LINK_TYPES.ARTIST]: "paint brush",
  [LINK_TYPES.BRAND]: "building",
  [LINK_TYPES.PIECE]: "puzzle"
};
export const NAVIGATION_LINKS = [
  {
    to: "/about",
    content: "About"
  },
  {
    to: "/help",
    content: "Help"
  },
  {
    to: "/updates",
    content: "Updates"
  },
  {
    to: "/contact",
    content: "Contact"
  }
];
export const STATES = Object.keys({
  AL: "Alabama",
  AK: "Alaska",
  AS: "American Samoa",
  AZ: "Arizona",
  AR: "Arkansas",
  CA: "California",
  CO: "Colorado",
  CT: "Connecticut",
  DE: "Delaware",
  DC: "District Of Columbia",
  FM: "Federated States Of Micronesia",
  FL: "Florida",
  GA: "Georgia",
  GU: "Guam",
  HI: "Hawaii",
  ID: "Idaho",
  IL: "Illinois",
  IN: "Indiana",
  IA: "Iowa",
  KS: "Kansas",
  KY: "Kentucky",
  LA: "Louisiana",
  ME: "Maine",
  MH: "Marshall Islands",
  MD: "Maryland",
  MA: "Massachusetts",
  MI: "Michigan",
  MN: "Minnesota",
  MS: "Mississippi",
  MO: "Missouri",
  MT: "Montana",
  NE: "Nebraska",
  NV: "Nevada",
  NH: "New Hampshire",
  NJ: "New Jersey",
  NM: "New Mexico",
  NY: "New York",
  NC: "North Carolina",
  ND: "North Dakota",
  MP: "Northern Mariana Islands",
  OH: "Ohio",
  OK: "Oklahoma",
  OR: "Oregon",
  PW: "Palau",
  PA: "Pennsylvania",
  PR: "Puerto Rico",
  RI: "Rhode Island",
  SC: "South Carolina",
  SD: "South Dakota",
  TN: "Tennessee",
  TX: "Texas",
  UT: "Utah",
  VT: "Vermont",
  VI: "Virgin Islands",
  VA: "Virginia",
  WA: "Washington",
  WV: "West Virginia",
  WI: "Wisconsin",
  WY: "Wyoming"
}).sort();
export const FIFTEEN_MINUTES = 1000 * 60 * 15;
export const ONE_DAY = 1000 * 60 * 60 * 24;
export const ONE_YEAR = ONE_DAY * 365;
export const VERBIAGE_CACHE_KEY = "VERBIAGE";
export const VERBIAGE_CACHE_EXPIRATION = ONE_DAY;
export const AGE_GATE_CACHE_KEY = "AGE GATE PASSED";
export const AGE_GATE_CACHE_EXPIRATION = ONE_YEAR;
export const ACCOUNT_CACHE_KEY = "ACCOUNT";
export const ACCOUNT_CACHE_EXPIRATION = FIFTEEN_MINUTES;
export const TOKEN_CACHE_KEY = "TOKEN";
export const TOKEN_CACHE_EXPIRATION = FIFTEEN_MINUTES;
export const ABOUT_CACHE_KEY = "ABOUT";
export const ABOUT_CACHE_EXPIRATION = ONE_DAY;
export const HELP_CACHE_KEY = "HELP";
export const HELP_CACHE_EXPIRATION = ONE_DAY;
export const UPDATE_CACHE_KEY = "UPDATE";
export const UPDATE_CACHE_EXPIRATION = ONE_DAY;
export const MY_PIECES_CACHE_KEY = "MY PIECES";
export const MY_PIECES_EXPIRATION = FIFTEEN_MINUTES;
export const UNVERIFIED_USER_SIGN_IN_ATTEMPT_ERROR =
  "An unverified account cannot sign in. Please check your inbox for the verification code.";
export const VERIFY_TO_SIGN_IN_NOTIFICATION =
  "You've signed up, but you haven't verified your email. Please check your inbox. If you need another email sent out, press the button below.";
export const RESEND_VERIFICATION_USER_VERIFIED_ERROR =
  "The user with the provided email has already been verified.";
