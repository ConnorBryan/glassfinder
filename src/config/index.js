import about from "./about.json";
import brands from "./brands.json";
import footer from "./footer.json";
import helpTopics from "./help-topics.json";
import heroes from "./heroes.json";
import navigation from "./navigation.json";
import pageHeaders from "./page-headers.json";
import pieces from "./pieces.json";
import shops from "./shops.json";
import socialMedia from "./social-media.json";
import states from "./states.json";
import updates from "./updates.json";

export default {
  appName: "Glassfinder",
  iconSet: {
    shop: "cart",
    artist: "paint brush",
    brand: "building",
    piece: "puzzle"
  },
  color: "green",
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
