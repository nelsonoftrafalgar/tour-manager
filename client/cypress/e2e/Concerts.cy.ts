describe('Search input', () => {
	it('should filter concert list', () => {
		cy.visit('/en/concerts')
		cy
			.intercept('GET', 'http://localhost:8000/api/concerts', {
				statusCode: 200,
				body: [
					{
						id: 1,
						place: 'Place1',
						date: '2020-05-06T17:30:05.519Z',
						band: { name: 'Band1', id: 1 },
						tourManager: { name: 'Tour manager1', id: 1 },
					},
					{
						id: 2,
						place: 'Place2',
						date: '2020-05-06T17:30:05.519Z',
						band: { name: 'Band2', id: 2 },
						tourManager: { name: 'Tour manager2', id: 2 },
					},
				],
			})
			.as('mockGET')
		cy.wait('@mockGET')
		cy.contains('Place1').should('be.visible')
		cy.contains('Place2').should('be.visible')
		cy.get('[placeholder="Filter by name"]').type('Place1')
		cy.contains('Place2').should('not.exist')
		cy.get('[placeholder="Filter by name"]').clear()
		cy.contains('Place1').should('be.visible')
		cy.contains('Place2').should('be.visible')
	})
})

describe('Concert list', () => {
	beforeEach(() => {
		cy.visit('/en/concerts')
		cy
			.intercept('GET', 'http://localhost:8000/api/concerts', {
				statusCode: 200,
				body: [
					{
						id: 1,
						place: 'Place1',
						date: '2020-05-06T17:30:05.519Z',
						band: { name: 'Band1', id: 1 },
						tourManager: { name: 'Tour manager1', id: 1 },
					},
					{
						id: 2,
						place: 'Place2',
						date: '2020-05-06T17:30:05.519Z',
						band: { name: 'Band2', id: 2 },
						tourManager: { name: 'Tour manager2', id: 2 },
					},
				],
			})
			.as('getConcerts')

		cy.wait('@getConcerts')
	})
	it('accordion should show single item at a time', () => {
		cy
			.intercept('GET', 'http://localhost:8000/api/bands', {
				statusCode: 200,
				body: [
					{ id: 1, name: 'Band1', frontMan: 'First frontman' },
					{ id: 2, name: 'Band2', frontMan: 'Second frontman' },
				],
			})
			.as('getBands')
		cy
			.intercept('GET', 'http://localhost:8000/api/tour_managers', {
				statusCode: 200,
				body: [
					{ id: 1, name: 'Tour manager1' },
					{ id: 2, name: 'Tour manager2' },
				],
			})
			.as('getTourManagers')
		cy.contains('Place1').click()
		cy.wait('@getBands')
		cy.wait('@getTourManagers')
		cy.get('[value="Place1"]').should('be.visible')
		cy.get('[value="Place2"]').should('not.exist')
		cy.contains('Place2').click()
		cy.get('[value="Place1"]').should('not.exist')
		cy.get('[value="Place2"]').should('be.visible')
	})
})

describe('Concert edit form', () => {
	beforeEach(() => {
		cy.visit('/en/concerts')
		cy
			.intercept('GET', 'http://localhost:8000/api/concerts', {
				statusCode: 200,
				body: [
					{
						id: '1',
						place: 'Place1',
						date: '2020-05-06T17:30:05.519Z',
						band: { name: 'Band1', id: '1' },
						tourManager: { name: 'Tour manager1', id: '1' },
					},
					{
						id: '2',
						place: 'Place2',
						date: '2020-05-06T17:30:05.519Z',
						band: { name: 'Band2', id: '2' },
						tourManager: { name: 'Tour manager2', id: '2' },
					},
				],
			})
			.as('getConcerts')

		cy.wait('@getConcerts')
		cy
			.intercept('GET', 'http://localhost:8000/api/bands', {
				statusCode: 200,
				body: [
					{ id: '1', name: 'Band1', frontMan: 'First frontman' },
					{ id: '2', name: 'Band2', frontMan: 'Second frontman' },
				],
			})
			.as('getBands')
		cy
			.intercept('GET', 'http://localhost:8000/api/tour_managers', {
				statusCode: 200,
				body: [
					{ id: '1', name: 'Tour manager1' },
					{ id: '2', name: 'Tour manager2' },
				],
			})
			.as('getTourManagers')
		cy.contains('Place1').click()
		cy.wait('@getBands')
		cy.wait('@getTourManagers')
	})
	it('should edit concert', () => {
		cy.contains('Save').should('be.disabled')
		cy.get('[value="Place1"]').clear().type('New Place')
		cy.contains('Save').should('not.be.disabled')
		cy
			.intercept('PUT', 'http://localhost:8000/api/concerts', {
				statusCode: 200,
				body: [
					{
						id: 1,
						place: 'New Place',
						date: '2020-05-06T17:30:05.519Z',
						band: { name: 'Band1', id: 1 },
						tourManager: { name: 'Tour manager1', id: 1 },
					},
				],
			})
			.as('editConcertPlace')
		cy.contains('Save').click()
		cy.wait('@editConcertPlace')
		cy.contains('Save').should('be.disabled')
		cy.get('[value="Place1"]').should('not.exist')
		cy.get('[value="New Place"]').should('exist')
		cy.get('[value="06/05/2020"]').clear().type('01/01/2021')
		cy.contains('Save').should('not.be.disabled')
		cy
			.intercept('PUT', 'http://localhost:8000/api/concerts', {
				statusCode: 200,
				body: [
					{
						id: 1,
						place: 'New Place',
						date: '2021-01-01T17:30:05.519Z',
						band: { name: 'Band1', id: 1 },
						tourManager: { name: 'Tour manager1', id: 1 },
					},
				],
			})
			.as('editConcertDate')
		cy.contains('Save').click()
		cy.wait('@editConcertDate')
		cy.get('[value="06/05/2020"]').should('not.exist')
		cy.get('[value="01/01/2021"]').should('exist')
		cy
			.get('[data-cy="select-trigger"]')
			.first()
			.click()
			.siblings()
			.last()
			.select('Band2', { force: true })
		cy.contains('Save').should('not.be.disabled')
		cy
			.intercept('PUT', 'http://localhost:8000/api/concerts', {
				statusCode: 200,
				body: [
					{
						id: 1,
						place: 'New Place',
						date: '2021-01-01T17:30:05.519Z',
						band: { name: 'Band2', id: 2 },
						tourManager: { name: 'Tour manager1', id: 1 },
					},
				],
			})
			.as('editConcertBand')
		cy.contains('Save').click()
		cy.wait('@editConcertBand')
		cy
			.get('[data-cy="select-trigger"]')
			.first()
			.children()
			.first()
			.should('contain', 'Band2')
		cy
			.get('[data-cy="select-trigger"]')
			.last()
			.click()
			.siblings()
			.last()
			.select('Tour manager2', { force: true })
		cy.contains('Save').should('not.be.disabled')
		cy
			.intercept('PUT', 'http://localhost:8000/api/concerts', {
				statusCode: 200,
				body: [
					{
						id: 1,
						place: 'New Place',
						date: '2021-01-01T17:30:05.519Z',
						band: { name: 'Band2', id: 2 },
						tourManager: { name: 'Tour manager2', id: 2 },
					},
				],
			})
			.as('editConcertTourManager')
		cy.contains('Save').click()
		cy.wait('@editConcertTourManager')
		cy
			.get('[data-cy="select-trigger"]')
			.last()
			.children()
			.first()
			.should('contain', 'Tour manager2')
	})
	it('should validate concert place', () => {
		cy.get('[value="Place1"]').clear().type('Place!')
		cy.contains('Save').click()
		cy.contains('Invalid characters').should('be.visible')
		cy.get('[value="Place!"]').clear()
		cy.contains('Save').click()
		cy.contains('This field is required').should('be.visible')
	})
	it('should validate concert date', () => {
		cy.get('[value="06/05/2020"]').clear()
		cy.contains('Save').click()
		cy.contains('This field is required').should('be.visible')
	})
})

describe('Concert create form', () => {
	beforeEach(() => {
		cy.visit('/en/concerts')
		cy
			.intercept('GET', 'http://localhost:8000/api/bands', {
				statusCode: 200,
				body: [
					{ id: '1', name: 'Band1', frontMan: 'First frontman' },
					{ id: '2', name: 'Band2', frontMan: 'Second frontman' },
				],
			})
			.as('getBands')
		cy
			.intercept('GET', 'http://localhost:8000/api/tour_managers', {
				statusCode: 200,
				body: [
					{ id: '1', name: 'Tour manager1' },
					{ id: '2', name: 'Tour manager2' },
				],
			})
			.as('getTourManagers')
		cy.contains('Add new concert').click()
		cy.wait('@getBands')
		cy.wait('@getTourManagers')
	})
	it('should create a new concert', () => {
		cy.get('[placeholder="Concert place"]').type('Place')
		cy.get('[placeholder="Pick date"]').type('01/01/2020')
		cy
			.get('[data-cy="select-trigger"]')
			.first()
			.click()
			.siblings()
			.last()
			.select('Band2', { force: true })
		cy
			.get('[data-cy="select-trigger"]')
			.last()
			.click()
			.siblings()
			.last()
			.select('Tour manager2', { force: true })
		cy
			.intercept('POST', 'http://localhost:8000/api/concerts', {
				statusCode: 200,
			})
			.as('createConcert')
		cy
			.intercept('GET', 'http://localhost:8000/api/concerts', {
				statusCode: 200,
				body: [
					{
						id: 1,
						place: 'Place',
						date: '2020-01-01T17:30:05.519Z',
						band: { name: 'Band2', id: 2 },
						tourManager: { name: 'Tour manager2', id: 2 },
					},
				],
			})
			.as('getConcerts')
		cy.contains(/^Add$/).click()
		cy.wait('@createConcert')
		cy.wait('@getConcerts')
		cy.contains('Band2').should('be.visible')
	})
	it('should validate concert place', () => {
		cy.get('[placeholder="Concert place"]').type('Place!')
		cy.contains(/^Add$/).click()
		cy.contains('Invalid characters').should('be.visible')
		cy.get('[value="Place!"]').clear()
		cy.contains(/^Add$/).click()
		cy.contains('This field is required').should('be.visible')
	})
	it('should validate concert date', () => {
		cy.get('[placeholder="Concert place"]').type('Place')
		cy.contains(/^Add$/).click()
		cy.contains('This field is required').should('be.visible')
	})
})

describe('Concert delete modal', () => {
	it('should delete concert', () => {
		cy.visit('/en/concerts')
		cy
			.intercept('GET', 'http://localhost:8000/api/concerts', {
				statusCode: 200,
				body: [
					{
						id: 1,
						place: 'Place1',
						date: '2020-05-06T17:30:05.519Z',
						band: { name: 'Band1', id: 1 },
						tourManager: { name: 'Tour manager1', id: 1 },
					},
					{
						id: 2,
						place: 'Place2',
						date: '2020-05-06T17:30:05.519Z',
						band: { name: 'Band2', id: 2 },
						tourManager: { name: 'Tour manager2', id: 2 },
					},
				],
			})
			.as('getConcerts')
		cy.wait('@getConcerts')
		cy
			.intercept('GET', 'http://localhost:8000/api/bands', {
				statusCode: 200,
				body: [
					{ id: 1, name: 'Band1', frontMan: 'First frontman' },
					{ id: 2, name: 'Band2', frontMan: 'Second frontman' },
				],
			})
			.as('getBands')
		cy
			.intercept('GET', 'http://localhost:8000/api/tour_managers', {
				statusCode: 200,
				body: [
					{ id: 1, name: 'Tour manager1' },
					{ id: 2, name: 'Tour manager2' },
				],
			})
			.as('getTourManagers')
		cy.contains('Place1').click()
		cy.wait('@getBands')
		cy.wait('@getTourManagers')
		cy.contains('Delete').click()
		cy.contains('Delete concert').should('be.visible')
		cy
			.intercept('DELETE', 'http://localhost:8000/api/concerts/1', {
				statusCode: 200,
			})
			.as('deleteConcert')
		cy
			.intercept('GET', 'http://localhost:8000/api/concerts', {
				statusCode: 200,
				body: [
					{
						id: 2,
						place: 'Place2',
						date: '2020-05-06T17:30:05.519Z',
						band: { name: 'Band2', id: 2 },
						tourManager: { name: 'Tour manager2', id: 2 },
					},
				],
			})
			.as('getConcerts2')
		cy.get('button:contains("Delete"):last').click()
		cy.wait('@deleteConcert')
		cy.wait('@getConcerts2')
		cy.contains('Delete concert').should('not.exist')
		cy.contains('Place1').should('not.exist')
	})
})

describe('Concert should properly display error toast', () => {
	beforeEach(() => {
		cy.visit('/en/concerts')
		cy
			.intercept('GET', 'http://localhost:8000/api/concerts', {
				statusCode: 200,
				body: [
					{
						id: '1',
						place: 'Place1',
						date: '2020-05-06T17:30:05.519Z',
						band: { name: 'Band1', id: '1' },
						tourManager: { name: 'Tour manager1', id: '1' },
					},
				],
			})
			.as('getConcerts')
		cy.wait('@getConcerts')
		cy
			.intercept('GET', 'http://localhost:8000/api/bands', {
				statusCode: 200,
				body: [
					{ id: '1', name: 'Band1', frontMan: 'First frontman' },
					{ id: '2', name: 'Band2', frontMan: 'Second frontman' },
				],
			})
			.as('getBands')
		cy
			.intercept('GET', 'http://localhost:8000/api/tour_managers', {
				statusCode: 200,
				body: [
					{ id: '1', name: 'Tour manager1' },
					{ id: '2', name: 'Tour manager2' },
				],
			})
			.as('getTourManagers')
		cy.contains('Place1').click()
		cy.wait('@getBands')
		cy.wait('@getTourManagers')
	})
	it('when DELETE returns 404', () => {
		cy.contains('Delete').click()
		cy
			.intercept('DELETE', 'http://localhost:8000/api/concerts/1', {
				statusCode: 404,
				body: { message: 'Concert not found' },
			})
			.as('mockDELETE')
		cy.get('button:contains("Delete"):last').click()
		cy.contains('.Toastify__toast-body', 'Concert not found')
	})
	it('when DELETE returns 400', () => {
		cy.contains('Delete').click()
		cy
			.intercept('DELETE', 'http://localhost:8000/api/concerts/1', {
				statusCode: 404,
				body: { message: 'Bad Request' },
			})
			.as('mockDELETE')
		cy.get('button:contains("Delete"):last').click()
		cy.contains('.Toastify__toast-body', 'Bad Request')
	})
	it('when PUT returns 400', () => {
		cy.get('[placeholder="Concert place"]').clear().type('Place')
		cy
			.intercept('PUT', 'http://localhost:8000/api/concerts', {
				statusCode: 400,
				body: { error: 'Bad Request' },
			})
			.as('createConcert')
		cy.contains('Save').click()
		cy.contains('.Toastify__toast-body', 'Bad Request')
	})
	it('when PUT returns 409', () => {
		cy.get('[placeholder="Concert place"]').clear().type('Place')
		cy
			.intercept('PUT', 'http://localhost:8000/api/concerts', {
				statusCode: 409,
				body: { message: 'Concert already exists' },
			})
			.as('createConcert')
		cy.contains('Save').click()
		cy.contains('.Toastify__toast-body', 'Concert already exists')
	})
	it('when POST returns 400', () => {
		cy.visit('/en/concerts')
		cy.contains('Add new concert').click()
		cy.get('[placeholder="Concert place"]').type('Place')
		cy.get('[placeholder="Pick date"]').type('01/01/2020')
		cy
			.get('[data-cy="select-trigger"]')
			.first()
			.click()
			.siblings()
			.last()
			.select('Band2', { force: true })
		cy
			.get('[data-cy="select-trigger"]')
			.last()
			.click()
			.siblings()
			.last()
			.select('Tour manager2', { force: true })
		cy
			.intercept('POST', 'http://localhost:8000/api/concerts', {
				statusCode: 400,
				body: { error: 'Bad Request' },
			})
			.as('mockPOST')
		cy.contains(/^Add$/).click()
		cy.contains('.Toastify__toast-body', 'Bad Request')
	})
	it('when POST returns 409', () => {
		cy.visit('/en/concerts')
		cy.contains('Add new concert').click()
		cy.get('[placeholder="Concert place"]').type('Place')
		cy.get('[placeholder="Pick date"]').type('01/01/2020')
		cy
			.get('[data-cy="select-trigger"]')
			.first()
			.click()
			.siblings()
			.last()
			.select('Band2', { force: true })
		cy
			.get('[data-cy="select-trigger"]')
			.last()
			.click()
			.siblings()
			.last()
			.select('Tour manager2', { force: true })
		cy
			.intercept('POST', 'http://localhost:8000/api/concerts', {
				statusCode: 409,
				body: { message: 'Concert already exists' },
			})
			.as('mockPOST')
		cy.contains(/^Add$/).click()
		cy.contains('.Toastify__toast-body', 'Concert already exists')
	})
})

describe('Concerts should handle error', () => {
	it('when GET returns 404', () => {
		cy.visit('/en/concerts')
		cy.intercept('GET', 'http://localhost:8000/api/concerts', {
			statusCode: 404,
			body: { error: 'Not Found' },
		})
		cy.contains('.Toastify__toast-body', 'Not Found')
	})
})
