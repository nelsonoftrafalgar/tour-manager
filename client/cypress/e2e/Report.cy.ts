describe('Report create form', () => {
	it('should create report', () => {
		cy
			.intercept('GET', 'http://localhost:8000/api/tour_managers', {
				statusCode: 200,
				body: [
					{ id: 1, name: 'Tour manager1' },
					{ id: 2, name: 'Tour manager2' },
				],
			})
			.as('getTourManagers')

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
		cy.visit('/en/reports')
		cy.wait('@getTourManagers')
		cy.wait('@getBands')
		cy.wait('@getConcerts')

		cy
			.intercept('GET', `http://localhost:8000/api/salaries/*`, {
				statusCode: 200,
				body: [
					{
						id: 1,
						amount: '$12345',
						comment: 'test comment',
						band: { name: 'Band1' },
						concert: { place: 'Place1', date: '2023-11-09T22:16:22.147Z' },
						tourManager: { name: 'Tour manager1' },
					},
				],
			})
			.as('getReport')
		cy.contains('Create report').click()
		cy.wait('@getReport')
	})
})
