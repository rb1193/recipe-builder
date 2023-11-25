import { makeServer } from '../../../server'

let server

beforeEach(() => {
    server = makeServer({ environment: 'test' })
})

afterEach(() => {
    server.shutdown()
})

const cy = window.cy

describe('The app', () => {
    it('displays the login form if the user is not authenticated', () => {
        cy.visit('/')
        cy.contains('Login')
    })

    it('displays recipes search page if the user is authenticated', () => {
        server.create('user', {
            email: 'foo@bar.com',
            password: 'hashedPassword',
        })
        cy.visit('/')
        cy.contains('Search recipes')
    })
})
