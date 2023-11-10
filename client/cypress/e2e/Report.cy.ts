describe('Report create form', () => {
	it('should create report', () => {
		cy
			.intercept('GET', 'http://localhost:8000/api/tour_managers', {
				fixture: 'initialTourManagers.json',
			})
			.as('getTourManagers')

		cy
			.intercept('GET', 'http://localhost:8000/api/bands', {
				fixture: 'initialBands.json',
			})
			.as('getBands')

		cy
			.intercept('GET', 'http://localhost:8000/api/concerts', {
				fixture: 'initialConcerts.json',
			})
			.as('getConcerts')
		cy.visit('/en/reports')
		cy.wait('@getTourManagers')
		cy.wait('@getBands')
		cy.wait('@getConcerts')

		cy
			.intercept('GET', `http://localhost:8000/api/salaries/*`, {
				fixture: 'initialSalaries.json',
			})
			.as('getReport')
		cy.contains('Create report').click()
		cy.wait('@getReport')
	})
})
