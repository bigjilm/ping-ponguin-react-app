/// <reference types="Cypress" />

context('SignInPage', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('has the right headline', () => {
    cy.get('h1').should('have.text', 'ping ponguin')
  })

  it('has a logo', () => {
    cy.get('img').should('have.length', 1)
  })

  it('has an email input', () => {
    cy.get('input[name=email]')
      .as('emailInput')
      .should('have.length', '1')
  })

  it('has a password input', () => {
    cy.get('input[name=password]')
      .as('passwordInput')
      .should('have.length', '1')
  })

  it('has a login button', () => {
    cy.get('button')
      .contains('Einloggen')
      .should('have.length', '1')
  })

  it('has a register button', () => {
    cy.get('button')
      .contains('Registrieren')
      .should('have.length', '1')
  })

  it('shows an alert on login click if email is missing', () => {
    cy.get('button')
      .contains('Einloggen')
      .click()

    cy.get('span')
      .should('have.length', '1')
      .should('contain', 'E-Mail-Adresse')
  })

  it('shows an alert on login click if email is entered and password is missing', () => {
    cy.get('input[name=email]')
      .as('emailInput')
      .type('someEmail')

    cy.get('button')
      .contains('Einloggen')
      .click()

    cy.get('span')
      .should('have.length', '1')
      .should('contain', 'Passwort')
  })

  it('shows an alert on login click if email and password are given and email does not a match a registered user', () => {
    cy.get('input[name=email]')
      .as('emailInput')
      .type('someEmail')

    cy.get('input[name=password]')
      .as('emailInput')
      .type('somePassword')

    cy.get('button')
      .contains('Einloggen')
      .click()

    cy.get('span')
      .should('have.length', '1')
      .should('contain', 'Konto')
  })

  it('shows an alert on login click if email and password are given, an account exists and password is incorrect', () => {
    cy.get('input[name=email]')
      .as('emailInput')
      .type('michi@neverland.com')

    cy.get('input[name=password]')
      .as('emailInput')
      .type('somePassword')

    cy.get('button')
      .contains('Einloggen')
      .click()

    cy.get('span')
      .should('have.length', '1')
      .should('contain', 'falsch')
  })

  it('switches to path /users on login click when email and password match', () => {
    cy.get('input[name=email]')
      .as('emailInput')
      .type('michi@neverland.com')

    cy.get('input[name=password]')
      .as('emailInput')
      .type('thriller')

    cy.get('button')
      .contains('Einloggen')
      .click()

    cy.url().should('contain', '/users')
  })

  it('stores a session token in local storage on successfull login', () => {
    cy.get('input[name=email]')
      .as('emailInput')
      .type('michi@neverland.com')

    cy.get('input[name=password]')
      .as('emailInput')
      .type('thriller')

    cy.get('button')
      .contains('Einloggen')
      .click()
      .should(() => {
        expect(localStorage.getItem('pingu-session')).to.have.length(24)
      })
  })

  it('switches to SingUpPage on register click', () => {
    cy.get('button')
      .contains('Registrieren')
      .click()

    cy.url().should('contain', '/signup')
  })
})
