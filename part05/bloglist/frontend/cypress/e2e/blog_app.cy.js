describe('blog app', function() {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.visit('http://localhost:3000')

    // Creating a user
    const user = {
      username: 'testuser',
      name: 'test name',
      password: '123abc'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })

  describe('Login', function() {
    it('succees with correct credentials', function() {
      cy.get('#username-input').type('testuser')
      cy.get('#password-input').type('123abc')
      cy.get('#login-button').click()
      cy.get('.success').should('exist')
    })

    it('fails with wrong cretentials', function() {
      cy.get('#username-input').type('testuser')
      cy.get('#password-input').type('wrongpswd')
      cy.get('#login-button').click()
      cy.get('.error').should('exist')
    })
  })
})