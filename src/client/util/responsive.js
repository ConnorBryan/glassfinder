import { Responsive } from "semantic-ui-react";

function checkIf(minWidth) {
  const query = window.matchMedia(`(min-width: ${minWidth}px)`);

  return !!query.matches;
}

export const mobileSized = checkIf(Responsive.onlyMobile.minWidth);
export const tabletSized = checkIf(Responsive.onlyTablet.minWidth);
export const computerSized = checkIf(Responsive.onlyComputer.minWidth);
export const largeScreenSized = checkIf(Responsive.onlyLargeScreen.minWidth);
export const widescreenSized = checkIf(Responsive.onlyWidescreen.minWidth);
