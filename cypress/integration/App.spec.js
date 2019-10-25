/// <reference types="Cypress" />

context('App', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('has the right App title', () => {
    cy.title().should('include', 'ping ponguin')
  })
})
