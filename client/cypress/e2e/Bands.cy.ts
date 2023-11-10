describe('Search input', () => {
	it('should filter band list', () => {
		cy.visit('/en/bands')
		cy
			.intercept('GET', 'http://localhost:8000/api/bands', {
				fixture: 'initialBands.json',
			})
			.as('getBands')
		cy.wait('@getBands')
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
				fixture: 'initialBands.json',
			})
			.as('getBands')
		cy.wait('@getBands')
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
				fixture: 'initialBands.json',
			})
			.as('getBands1')
		cy.wait('@getBands1')
		cy.contains('First band').click()
		cy.contains('Save').should('be.disabled')
		cy.get('[value="First frontman"]').clear().type('Second frontman')
		cy.contains('Save').should('not.be.disabled')
		cy
			.intercept('PUT', 'http://localhost:8000/api/bands', {
				statusCode: 200,
				body: [{ id: 1, name: 'First band', frontMan: 'Second frontman' }],
			})
			.as('updateFrontman')
		cy.contains('Save').click()
		cy.wait('@updateFrontman')
		cy.contains('Save').should('be.disabled')
		cy.get('[value="First frontman"]').should('not.exist')
		cy.get('[value="Second frontman"]').should('be.visible')
		cy.get('[value="First band"]').clear().type('Second band')
		cy
			.intercept('PUT', 'http://localhost:8000/api/bands', {
				statusCode: 200,
				body: [{ id: 1, name: 'Second band', frontMan: 'Second frontman' }],
			})
			.as('updateName')
		cy
			.intercept('GET', 'http://localhost:8000/api/bands', {
				statusCode: 200,
				body: [{ id: 1, name: 'Second band', frontMan: 'Second frontman' }],
			})
			.as('getBands2')
		cy.contains('Save').click()
		cy.wait('@updateName')
		cy.wait('@getBands2')
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
				fixture: 'initialBands.json',
			})
			.as('getBands1')
		cy.wait('@getBands1')
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
				fixture: 'initialBands.json',
			})
			.as('getBands1')
		cy.wait('@getBands1')
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
				fixture: 'initialBands.json',
			})
			.as('getBands1')
		cy.wait('@getBands1')
		cy.contains('Add new band').click()
		cy.get('[placeholder="Band name"]').type('Third band')
		cy.get('[placeholder="Band frontman"]').type('Third frontman')
		cy
			.intercept('POST', 'http://localhost:8000/api/bands', {
				statusCode: 200,
			})
			.as('createBand')
		cy
			.intercept('GET', 'http://localhost:8000/api/bands', {
				statusCode: 200,
				body: [
					{ id: 1, name: 'First band', frontMan: 'First frontman' },
					{ id: 2, name: 'Second band', frontMan: 'Second frontman' },
					{ id: 3, name: 'Third band', frontMan: 'Third frontman' },
				],
			})
			.as('getBands1')
		cy.contains(/^Add$/).click()
		cy.wait('@createBand')
		cy.wait('@getBands1')
		cy.contains('Third band').should('be.visible')
	})
	it('should validate band name', () => {
		cy.visit('/en/bands')
		cy
			.intercept('GET', 'http://localhost:8000/api/bands', {
				fixture: 'initialBands.json',
			})
			.as('getBands1')
		cy.wait('@getBands1')
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
				fixture: 'initialBands.json',
			})
			.as('getBands1')
		cy.wait('@getBands1')
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
				fixture: 'initialBands.json',
			})
			.as('getBands1')
		cy.wait('@getBands1')
		cy.contains('First band').click()
		cy.contains('Delete').click()
		cy.contains('Delete band').should('be.visible')
		cy
			.intercept('DELETE', 'http://localhost:8000/api/bands/1', {
				statusCode: 200,
			})
			.as('deleteBand')
		cy
			.intercept('GET', 'http://localhost:8000/api/bands', {
				statusCode: 200,
				body: [{ id: 2, name: 'Second band', frontMan: 'Second frontman' }],
			})
			.as('getBands2')
		cy.get('button:contains("Delete"):last').click()
		cy.wait('@deleteBand')
		cy.wait('@getBands2')
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
			.as('getBands1')
		cy.wait('@getBands1')
		cy.contains('First band').click()
		cy.contains('Delete').click()
		cy
			.intercept('DELETE', 'http://localhost:8000/api/bands/1', {
				statusCode: 404,
				body: { message: 'Band not found' },
			})
			.as('deleteBand')
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
			.as('getBands1')
		cy.wait('@getBands1')
		cy.contains('First band').click()
		cy.contains('Delete').click()
		cy
			.intercept('DELETE', 'http://localhost:8000/api/bands/1', {
				statusCode: 400,
				body: { error: 'Bad Request' },
			})
			.as('deleteBand')
		cy.get('button:contains("Delete"):last').click()
		cy.contains('.Toastify__toast-body', 'Bad Request')
	})
	it('when POST returns 400', () => {
		cy.visit('/en/bands')
		cy
			.intercept('GET', 'http://localhost:8000/api/bands', {
				fixture: 'initialBands.json',
			})
			.as('getBands1')
		cy.wait('@getBands1')
		cy.contains('Add new band').click()
		cy.get('[placeholder="Band name"]').type('Third band')
		cy.get('[placeholder="Band frontman"]').type('Third frontman')
		cy
			.intercept('POST', 'http://localhost:8000/api/bands', {
				statusCode: 400,
				body: { error: 'Bad Request' },
			})
			.as('createBand')
		cy.contains(/^Add$/).click()
		cy.wait('@createBand')
		cy.contains('.Toastify__toast-body', 'Bad Request')
	})
	it('when POST returns 409', () => {
		cy.visit('/en/bands')
		cy
			.intercept('GET', 'http://localhost:8000/api/bands', {
				fixture: 'initialBands.json',
			})
			.as('getBands1')
		cy.wait('@getBands1')
		cy.contains('Add new band').click()
		cy.get('[placeholder="Band name"]').type('Third band')
		cy.get('[placeholder="Band frontman"]').type('Third frontman')
		cy
			.intercept('POST', 'http://localhost:8000/api/bands', {
				statusCode: 409,
				body: { message: 'Band already exists' },
			})
			.as('createBand')
		cy.contains(/^Add$/).click()
		cy.wait('@createBand')
		cy.contains('.Toastify__toast-body', 'Band already exists')
	})
	it('when PUT returns 400', () => {
		cy.visit('/en/bands')
		cy
			.intercept('GET', 'http://localhost:8000/api/bands', {
				fixture: 'initialBands.json',
			})
			.as('getBands1')
		cy.wait('@getBands1')
		cy.contains('First band').click()
		cy.get('[value="First frontman"]').clear().type('Second frontman')
		cy
			.intercept('PUT', 'http://localhost:8000/api/bands', {
				statusCode: 400,
				body: { error: 'Bad Request' },
			})
			.as('updateFrontman')
		cy.contains('Save').click()
		cy.wait('@updateFrontman')
		cy.contains('.Toastify__toast-body', 'Bad Request')
	})
	it('when PUT returns 409', () => {
		cy.visit('/en/bands')
		cy
			.intercept('GET', 'http://localhost:8000/api/bands', {
				fixture: 'initialBands.json',
			})
			.as('getBands1')
		cy.wait('@getBands1')
		cy.contains('First band').click()
		cy.get('[value="First frontman"]').clear().type('Second frontman')
		cy
			.intercept('PUT', 'http://localhost:8000/api/bands', {
				statusCode: 409,
				body: { message: 'Band already exists' },
			})
			.as('updateFrontman')
		cy.contains('Save').click()
		cy.wait('@updateFrontman')
		cy.contains('.Toastify__toast-body', 'Band already exists')
	})
})

describe('Bands should handle error', () => {
	it('when GET returns 404', () => {
		cy.visit('/en/bands')
		cy.intercept('GET', 'http://localhost:8000/api/bands', {
			statusCode: 404,
			body: { error: 'Not Found' },
		})
		cy.contains('.Toastify__toast-body', 'Not Found')
	})
})
