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

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'testuser', password: '123abc' })
    })

    it('a blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title-input').type('test title')
      cy.get('#author-input').type('test author')
      cy.get('#url-input').type('test url')
      cy.get('#blog-button').click()
      cy.contains('test title - test author')
    })

    it('users can like a blog', function() {
      cy.createBlog({ title: 'test title', author: 'test author', url: 'test url', likes: 3 })
      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('like').parent().should('contain', '4')
    })

    it('users can delete their blogs', function() {
      cy.createBlog({ title: 'test title', author: 'test author', url: 'test url', likes: 3 })
      cy.contains('view').click()
      cy.contains('remove').click()
      cy.contains('test title - test author').should('not.exist')
    })
  })

})