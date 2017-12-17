import about from "./about.json";
import footer from "./footer.json";
import helpTopics from "./help-topics.json";
import heroes from "./heroes.json";
import navigation from "./navigation.json";
import pageHeaders from "./page-headers.json";
import socialMedia from "./social-media.json";
import states from "./states.json";
import updates from "./updates.json";
import shops from "../slices/shops/config.json";
import brands from "../slices/brands/config.json";
import pieces from "../slices/pieces/config.json";

export default {
  appName: "Glassfinder",
  iconSet: {
    shop: "cart",
    artist: "paint brush",
    brand: "building",
    piece: "puzzle"
  },
  color: "blue",
  placeholderImage: "https://placehold.it/400x400",
  about,
  brands,
  footer,
  helpTopics,
  heroes,
  navigation,
  pageHeaders,
  pieces,
  shops,
  socialMedia,
  states: Object.keys(states).sort(),
  updates
};
