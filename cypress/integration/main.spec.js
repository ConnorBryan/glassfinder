const baseUrl = "http://localhost:3000/";

const openBaseUrl = () => cy.visit(baseUrl);

const ensureNavigable = (id, include) => {
  openBaseUrl();
  cy.get(`#${id}`).click();
  cy.location("pathname").should("include", include || id);
};

describe("Glassfinder", () => {
  context("Public Screens", () => {
    context("Home", () => {
      it("should have the correct title", () => {
        openBaseUrl();
        cy.title().should("include", "Glassfinder");
      });

      it("should be navigable", () => {
        openBaseUrl();
        cy.get("#updates").click();
        cy.get("#home").click();
        cy.location("pathname").should("equal", "/");
      });

      it("should properly link to all three heroes", () => {
        openBaseUrl();
        ensureNavigable("visit-explore-shops", "explore-shops");
        openBaseUrl();
        ensureNavigable("visit-explore-pieces", "explore-pieces");
        openBaseUrl();
        ensureNavigable("visit-explore-brands", "explore-brands");
      });

      it("should link to '/updates' when the 'View All' button is pressed", () => {
        openBaseUrl();
        ensureNavigable("view-all-updates", "updates");
      });
    });

    context("Updates", () => {
      it("should be navigable", () => ensureNavigable("updates"));
    });

    context("Help", () => {
      it("should be navigable", () => ensureNavigable("help"));
    });

    context("About", () => {
      it("should be navigable", () => ensureNavigable("about"));
    });

    context("Contact", () => {
      it("should be navigable", () => ensureNavigable("contact"));
    });

    context("Explore Shops", () => {
      it("should be navigable", () => ensureNavigable("explore-shops"));
    });

    context("Explore Pieces", () => {
      it("should be navigable", () => ensureNavigable("explore-pieces"));
    });

    context("Explore Brands", () => {
      it("should be navigable", () => ensureNavigable("explore-brands"));
    });

    context("Sign In", () => {
      it("should be navigable", () => ensureNavigable("sign-in"));
    });

    context("Sign Up", () => {
      it("should be navigable", () => ensureNavigable("sign-up"));
    });

    context("Terms and Conditions", () => {
      it("should be navigable", () => ensureNavigable("terms-and-conditions"));
    });

    context("Terms and Conditions", () => {
      it("should be navigable", () => ensureNavigable("privacy-policy"));
    });
  });
});
