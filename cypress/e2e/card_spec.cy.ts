import { v4 as uuidv4 } from "uuid";

describe("card", () => {
  it("user can add new item", () => {
    // visit homepage
    cy.visit("http://localhost:3000");

    // click Card link
    cy.findByRole("link", {
      name: /card/i
    }).click();

    let oldCardTotal;
    cy.get("[data-testid=\"total\"]").then($total => oldCardTotal = $total.text());

    // add new card item
    const newTitle = uuidv4();
    const newTitleLink = "Go To Google";
    cy.findByPlaceholderText(/add new title/i).type(newTitle);
    cy.findByPlaceholderText(/add new link$/i).type("https://google.com");
    cy.findByPlaceholderText(/add new link title/i).type(newTitleLink);
    cy.findByRole("button", { name: /add/i }).click({ force: true });

    // back to cards list
    cy.get("button").click();

    // click on card
    cy.findByText(newTitle).click();

    // verify the new card title and link title
    cy.findByText(newTitle).should("be.visible");
    cy.findByText(newTitleLink).should("be.visible");

    cy.get("button").click();

    // check the card total
    cy.get("[data-testid=\"total\"]").then($total => {
      const convertedNewTotal = Number($total.text());
      const convertedOldTotal = Number(oldCardTotal);
      expect(convertedNewTotal - convertedOldTotal).to.equal(1);
    });
  });
});