import ArtistDetail from "./detail";

export default [
  {
    path: "/artist/:id?",
    exact: true,
    component: ArtistDetail
  }
];
