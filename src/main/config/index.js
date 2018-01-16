export const LINK_TYPES = {
  SHOP: "SHOP",
  ARTIST: "ARTIST",
  BRAND: "BRAND"
};

export const ICON_SET = {
  [LINK_TYPES.SHOP]: "shopping cart",
  [LINK_TYPES.ARTIST]: "paint brush",
  [LINK_TYPES.BRAND]: "building"
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
