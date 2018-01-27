export const API_ROOT = process.env.REACT_APP_API;
export const ADMIN_API_ROOT = `${API_ROOT}/admin`;

export const LINK_TYPES = {
  SHOP: "SHOP",
  ARTIST: "ARTIST",
  BRAND: "BRAND"
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
