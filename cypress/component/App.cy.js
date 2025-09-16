import App from "@/App.vue";
const createComponent = ({} = {}) => cy.mount(App);

describe("App", () => {
  it("does not show results", () => {
    createComponent();

    cy.get('[data-testid="searcher"]').type("asdf");
    cy.selectItemInList("Test 1"); // this fails
  });
});
