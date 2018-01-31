/**
 * I S O M O R P H I C
 *    C O N F I G U R A T I O N
 *        V A L U E S
 */
export const ENVIRONMENT = process.env.NODE_ENV || "development";

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

export const API_PORT = process.env.API_PORT || 6166;

export const URL = process.env.URL;

export const TRANSPORTER_EMAIL_ADDRESS = "do_not_reply@glassfinder.com";

export const CONTACT_EMAIL_ADDRESS = "cchromium@gmail.com";

export const PLACEHOLDER_IMAGE = "https://placehold.it/400x400";

export const PLACEHOLDER_SITE = "https://google.com";

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
