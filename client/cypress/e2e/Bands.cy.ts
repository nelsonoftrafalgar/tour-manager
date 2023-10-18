describe('Bands view', () => {
	it('should contain search input', () => {
		cy.visit('/en/bands')
		cy.get('[placeholder="Filter by name"]').should('be.visible')
	})
	it('should contain add button', () => {
		cy.visit('/en/bands')
		cy.contains('Add new band').should('be.visible')
	})

	it('should contain band list', () => {
		cy.visit('/en/bands')
		cy.get('[data-testid="bands-list"]').should('be.visible')
	})
})

describe('Search input', () => {
	it('should filter band list', () => {
		cy.visit('/en/bands')
		cy
			.intercept('GET', 'http://localhost:8000/api/bands', {
				statusCode: 200,
				body: [
					{ id: 1, name: 'First band', frontMan: 'First frontman' },
					{ id: 2, name: 'Second band', frontMan: 'Second frontman' },
				],
			})
			.as('mockGET')
		cy.wait('@mockGET')
		cy.contains('First band').should('be.visible')
		cy.contains('Second band').should('be.visible')
		cy.get('[placeholder="Filter by name"]').type('First')
		cy.contains('Second band').should('not.exist')
		cy.get('[placeholder="Filter by name"]').clear()
		cy.contains('First band').should('be.visible')
		cy.contains('Second band').should('be.visible')
	})
})

describe('Band list', () => {
	it('accordion should show single item at a time', () => {
		cy.visit('/en/bands')
		cy
			.intercept('GET', 'http://localhost:8000/api/bands', {
				statusCode: 200,
				body: [
					{ id: 1, name: 'First band', frontMan: 'First frontman' },
					{ id: 2, name: 'Second band', frontMan: 'Second frontman' },
				],
			})
			.as('mockGET')
		cy.wait('@mockGET')
		cy.contains('First band').click()
		cy.get('[value="First frontman"]').should('be.visible')
		cy.get('[value="Second frontman"]').should('not.exist')
		cy.contains('Second band').click()
		cy.get('[value="First frontman"]').should('not.exist')
		cy.get('[value="Second frontman"]').should('be.visible')
	})
})

describe('Band edit form', () => {
	it('should edit band', () => {
		cy.visit('/en/bands')
		cy
			.intercept('GET', 'http://localhost:8000/api/bands', {
				statusCode: 200,
				body: [{ id: 1, name: 'First band', frontMan: 'First frontman' }],
			})
			.as('mockGET1')
		cy.wait('@mockGET1')
		cy.contains('First band').click()
		cy.contains('Save').should('be.disabled')
		cy.get('[value="First frontman"]').clear().type('Second frontman')
		cy.contains('Save').should('not.be.disabled')
		cy
			.intercept('PUT', 'http://localhost:8000/api/bands', {
				statusCode: 200,
				body: [{ id: 1, name: 'First band', frontMan: 'Second frontman' }],
			})
			.as('mockPUTfrontman')
		cy.contains('Save').click()
		cy.wait('@mockPUTfrontman')
		cy.contains('Save').should('be.disabled')
		cy.get('[value="First frontman"]').should('not.exist')
		cy.get('[value="Second frontman"]').should('be.visible')
		cy.get('[value="First band"]').clear().type('Second band')
		cy
			.intercept('PUT', 'http://localhost:8000/api/bands', {
				statusCode: 200,
				body: [{ id: 1, name: 'Second band', frontMan: 'Second frontman' }],
			})
			.as('mockPUTname')
		cy
			.intercept('GET', 'http://localhost:8000/api/bands', {
				statusCode: 200,
				body: [{ id: 1, name: 'Second band', frontMan: 'Second frontman' }],
			})
			.as('mockGET2')
		cy.contains('Save').click()
		cy.wait('@mockPUTname')
		cy.wait('@mockGET2')
		cy.get('[value="First band"]').should('not.exist')
		cy.get('[value="Second band"]').should('be.visible')
		cy.contains('Save').should('be.disabled')
		cy.contains('First band').should('not.exist')
		cy.contains('Second band').should('be.visible')
	})
	it('should validate band name', () => {
		cy.visit('/en/bands')
		cy
			.intercept('GET', 'http://localhost:8000/api/bands', {
				statusCode: 200,
				body: [
					{ id: 1, name: 'First band', frontMan: 'First frontman' },
					{ id: 2, name: 'Second band', frontMan: 'Second frontman' },
				],
			})
			.as('mockGET1')
		cy.wait('@mockGET1')
		cy.contains('First band').click()
		cy.get('[value="First band"]').clear().type('First band!')
		cy.contains('Save').click()
		cy.contains('Invalid characters').should('be.visible')
		cy.get('[value="First band!"]').clear()
		cy.contains('Save').click()
		cy.contains('This field is required').should('be.visible')
	})
	it('should validate band frontMan', () => {
		cy.visit('/en/bands')
		cy
			.intercept('GET', 'http://localhost:8000/api/bands', {
				statusCode: 200,
				body: [
					{ id: 1, name: 'First band', frontMan: 'First frontman' },
					{ id: 2, name: 'Second band', frontMan: 'Second frontman' },
				],
			})
			.as('mockGET1')
		cy.wait('@mockGET1')
		cy.contains('First band').click()
		cy.get('[value="First frontman"]').clear().type('First frontman!')
		cy.contains('Save').click()
		cy.contains('Invalid characters').should('be.visible')
		cy.get('[value="First frontman!"]').clear()
		cy.contains('Save').click()
		cy.contains('This field is required').should('be.visible')
	})
})

describe('Band create form', () => {
	it('should create a new band', () => {
		cy.visit('/en/bands')
		cy
			.intercept('GET', 'http://localhost:8000/api/bands', {
				statusCode: 200,
				body: [
					{ id: 1, name: 'First band', frontMan: 'First frontman' },
					{ id: 2, name: 'Second band', frontMan: 'Second frontman' },
				],
			})
			.as('mockGET1')
		cy.wait('@mockGET1')
		cy.contains('Add new band').click()
		cy.get('[placeholder="Band name"]').type('Third band')
		cy.get('[placeholder="Band frontman"]').type('Third frontman')
		cy
			.intercept('POST', 'http://localhost:8000/api/bands', {
				statusCode: 200,
			})
			.as('mockPOST')
		cy
			.intercept('GET', 'http://localhost:8000/api/bands', {
				statusCode: 200,
				body: [
					{ id: 1, name: 'First band', frontMan: 'First frontman' },
					{ id: 2, name: 'Second band', frontMan: 'Second frontman' },
					{ id: 3, name: 'Third band', frontMan: 'Third frontman' },
				],
			})
			.as('mockGET1')
		cy.contains(/^Add$/).click()
		cy.wait('@mockPOST')
		cy.wait('@mockGET1')
		cy.contains('Third band').should('be.visible')
	})
	it('should validate band name', () => {
		cy.visit('/en/bands')
		cy
			.intercept('GET', 'http://localhost:8000/api/bands', {
				statusCode: 200,
				body: [
					{ id: 1, name: 'First band', frontMan: 'First frontman' },
					{ id: 2, name: 'Second band', frontMan: 'Second frontman' },
				],
			})
			.as('mockGET1')
		cy.wait('@mockGET1')
		cy.contains('Add new band').click()
		cy.get('[placeholder="Band name"]').type('Third band!')
		cy.get('[placeholder="Band frontman"]').type('Third frontman')
		cy.contains(/^Add$/).click()
		cy.contains('Invalid characters').should('be.visible')
		cy.get('[placeholder="Band name"]').clear()
		cy.contains(/^Add$/).click()
		cy.contains('This field is required').should('be.visible')
	})
	it('should validate band frontMan', () => {
		cy.visit('/en/bands')
		cy
			.intercept('GET', 'http://localhost:8000/api/bands', {
				statusCode: 200,
				body: [
					{ id: 1, name: 'First band', frontMan: 'First frontman' },
					{ id: 2, name: 'Second band', frontMan: 'Second frontman' },
				],
			})
			.as('mockGET1')
		cy.wait('@mockGET1')
		cy.contains('Add new band').click()
		cy.get('[placeholder="Band name"]').type('Third band')
		cy.get('[placeholder="Band frontman"]').type('Third frontman#')
		cy.contains(/^Add$/).click()
		cy.contains('Invalid characters').should('be.visible')
		cy.get('[placeholder="Band frontman"]').clear()
		cy.contains(/^Add$/).click()
		cy.contains('This field is required').should('be.visible')
	})
})

describe('Band delete modal', () => {
	it('should delete band', () => {
		cy.visit('/en/bands')
		cy
			.intercept('GET', 'http://localhost:8000/api/bands', {
				statusCode: 200,
				body: [
					{ id: 1, name: 'First band', frontMan: 'First frontman' },
					{ id: 2, name: 'Second band', frontMan: 'Second frontman' },
				],
			})
			.as('mockGET1')
		cy.wait('@mockGET1')
		cy.contains('First band').click()
		cy.contains('Delete').click()
		cy.contains('Delete band').should('be.visible')
		cy
			.intercept('DELETE', 'http://localhost:8000/api/bands/1', {
				statusCode: 200,
			})
			.as('mockDELETE')
		cy
			.intercept('GET', 'http://localhost:8000/api/bands', {
				statusCode: 200,
				body: [{ id: 2, name: 'Second band', frontMan: 'Second frontman' }],
			})
			.as('mockGET2')
		cy.get('button:contains("Delete"):last').click()
		cy.wait('@mockDELETE')
		cy.wait('@mockGET2')
		cy.contains('Delete band').should('not.exist')
		cy.contains('First band').should('not.exist')
	})
})

describe('Band should propelry display error toast', () => {
	it('when DELETE returns 404', () => {
		cy.visit('/en/bands')
		cy
			.intercept('GET', 'http://localhost:8000/api/bands', {
				statusCode: 200,
				body: [{ id: 1, name: 'First band', frontMan: 'First frontman' }],
			})
			.as('mockGET1')
		cy.wait('@mockGET1')
		cy.contains('First band').click()
		cy.contains('Delete').click()
		cy
			.intercept('DELETE', 'http://localhost:8000/api/bands/1', {
				statusCode: 404,
				body: { message: 'Band not found' },
			})
			.as('mockDELETE')
		cy.get('button:contains("Delete"):last').click()
		cy.contains('.Toastify__toast-body', 'Band not found')
	})
	it('when DELETE returns 400', () => {
		cy.visit('/en/bands')
		cy
			.intercept('GET', 'http://localhost:8000/api/bands', {
				statusCode: 200,
				body: [{ id: 1, name: 'First band', frontMan: 'First frontman' }],
			})
			.as('mockGET1')
		cy.wait('@mockGET1')
		cy.contains('First band').click()
		cy.contains('Delete').click()
		cy
			.intercept('DELETE', 'http://localhost:8000/api/bands/1', {
				statusCode: 400,
				body: { error: 'Bad Request' },
			})
			.as('mockDELETE')
		cy.get('button:contains("Delete"):last').click()
		cy.contains('.Toastify__toast-body', 'Bad Request')
	})
	it('when POST returns 400', () => {
		cy.visit('/en/bands')
		cy
			.intercept('GET', 'http://localhost:8000/api/bands', {
				statusCode: 200,
				body: [{ id: 1, name: 'First band', frontMan: 'First frontman' }],
			})
			.as('mockGET1')
		cy.wait('@mockGET1')
		cy.contains('Add new band').click()
		cy.get('[placeholder="Band name"]').type('Third band')
		cy.get('[placeholder="Band frontman"]').type('Third frontman')
		cy
			.intercept('POST', 'http://localhost:8000/api/bands', {
				statusCode: 400,
				body: { error: 'Bad Request' },
			})
			.as('mockPOST')
		cy.contains(/^Add$/).click()
		cy.wait('@mockPOST')
		cy.contains('.Toastify__toast-body', 'Bad Request')
	})
	it('when POST returns 409', () => {
		cy.visit('/en/bands')
		cy
			.intercept('GET', 'http://localhost:8000/api/bands', {
				statusCode: 200,
				body: [{ id: 1, name: 'First band', frontMan: 'First frontman' }],
			})
			.as('mockGET1')
		cy.wait('@mockGET1')
		cy.contains('Add new band').click()
		cy.get('[placeholder="Band name"]').type('Third band')
		cy.get('[placeholder="Band frontman"]').type('Third frontman')
		cy
			.intercept('POST', 'http://localhost:8000/api/bands', {
				statusCode: 409,
				body: { message: 'Band already exists' },
			})
			.as('mockPOST')
		cy.contains(/^Add$/).click()
		cy.wait('@mockPOST')
		cy.contains('.Toastify__toast-body', 'Band already exists')
	})
	it('when PUT returns 400', () => {
		cy.visit('/en/bands')
		cy
			.intercept('GET', 'http://localhost:8000/api/bands', {
				statusCode: 200,
				body: [{ id: 1, name: 'First band', frontMan: 'First frontman' }],
			})
			.as('mockGET1')
		cy.wait('@mockGET1')
		cy.contains('First band').click()
		cy.get('[value="First frontman"]').clear().type('Second frontman')
		cy
			.intercept('PUT', 'http://localhost:8000/api/bands', {
				statusCode: 400,
				body: { error: 'Bad Request' },
			})
			.as('mockPUTfrontman')
		cy.contains('Save').click()
		cy.wait('@mockPUTfrontman')
		cy.contains('.Toastify__toast-body', 'Bad Request')
	})
	it('when PUT returns 409', () => {
		cy.visit('/en/bands')
		cy
			.intercept('GET', 'http://localhost:8000/api/bands', {
				statusCode: 200,
				body: [{ id: 1, name: 'First band', frontMan: 'First frontman' }],
			})
			.as('mockGET1')
		cy.wait('@mockGET1')
		cy.contains('First band').click()
		cy.get('[value="First frontman"]').clear().type('Second frontman')
		cy
			.intercept('PUT', 'http://localhost:8000/api/bands', {
				statusCode: 409,
				body: { message: 'Band already exists' },
			})
			.as('mockPUTfrontman')
		cy.contains('Save').click()
		cy.wait('@mockPUTfrontman')
		cy.contains('.Toastify__toast-body', 'Band already exists')
	})
})
