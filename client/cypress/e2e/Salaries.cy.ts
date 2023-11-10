describe('Salaries create form', () => {
	it('should create new salary', () => {
		cy.visit('/en/salaries')
		cy
			.intercept('GET', 'http://localhost:8000/api/concerts', {
				fixture: 'initialConcerts.json',
			})
			.as('getConcerts')
		cy
			.intercept('GET', 'http://localhost:8000/api/salaries', {
				statusCode: 200,
				body: [],
			})
			.as('getSalaries')
		cy.wait('@getSalaries')
		cy.wait('@getConcerts')
		cy.get('[data-cy="select-trigger"]').click()
		cy.contains('Place1').click()
		cy.get('[placeholder="Amount"]').type('12345')
		cy.get('[placeholder="Add comment"]').type('Test comment')
		cy.get('[data-cy="concert-details-wrapper"]').should('be.visible')
		cy.contains('Band1').should('be.visible')
		cy.contains('06/05/2020').should('be.visible')
		cy.contains('Tour manager1').should('be.visible')
		cy
			.intercept('POST', 'http://localhost:8000/api/salaries', {
				statusCode: 200,
				body: {
					message: 'Salary has been successfully created',
				},
			})
			.as('createSalary')
		cy
			.intercept('GET', 'http://localhost:8000/api/salaries', {
				fixture: 'initialSalaries.json',
			})
			.as('getNewSalaries')
		cy.contains(/^Create$/).click()
		cy.wait('@createSalary')
		cy.wait('@getNewSalaries')
		cy.contains('.Toastify__toast-body', 'Salary has been successfully created')
		cy.get('[placeholder="Amount"]').should('be.empty')
		cy.get('[placeholder="Add comment"]').should('be.empty')
		cy.get('[data-cy="concert-details-wrapper"]').should('not.exist')
		cy
			.get('[data-cy="select-trigger"]')
			.should('have.text', 'Select concert place')
		cy.get('[data-cy="salary-details-list"]').should('be.visible')
	})
})

describe('Salary edit form', () => {
	it('should edit salary', () => {
		cy.visit('/en/salaries')
		cy
			.intercept('GET', 'http://localhost:8000/api/concerts', {
				statusCode: 200,
				body: [],
			})
			.as('getConcerts')
		cy
			.intercept('GET', 'http://localhost:8000/api/salaries', {
				fixture: 'initialSalaries.json',
			})
			.as('getSalaries')
		cy.wait('@getSalaries')
		cy.wait('@getConcerts')
		cy.get('[data-cy="salary-details-list"]').first().click()
		cy
			.intercept('GET', 'http://localhost:8000/api/concerts', {
				fixture: 'initialConcerts.json',
			})
			.as('getConcertsForEdit')
		cy.contains('Edit').click()
		cy.wait('@getConcertsForEdit')
		cy.get('[value="$12345"]').clear().type('54321')
		cy.get('textarea').eq(1).clear({ force: true }).type('New comment')
		cy
			.intercept('PUT', 'http://localhost:8000/api/salaries', {
				statusCode: 200,
				body: {
					message: 'Salary has been successfully updated',
				},
			})
			.as('editSalary')
		cy
			.intercept('GET', 'http://localhost:8000/api/salaries', {
				statusCode: 200,
				body: [
					{
						id: 1,
						amount: '$54321',
						comment: 'New comment',
						band: { name: 'Band1' },
						tourManager: { name: 'Tour manager1' },
						concert: {
							place: 'Place1',
							date: '2020-05-06T17:30:05.519Z',
							id: 1,
						},
					},
				],
			})
			.as('getUpdatedSalary')
		cy.get('[data-cy="salary-edit-submit"]').click()
		cy.wait('@editSalary')
		cy.wait('@getUpdatedSalary')
		cy.contains('.Toastify__toast-body', 'Salary has been successfully updated')
		cy.contains('New comment').should('be.visible')
		cy.contains('$ 54321').should('be.visible')
	})
})

describe('Salary delete', () => {
	it('should delete salary', () => {
		cy.visit('/en/salaries')
		cy
			.intercept('GET', 'http://localhost:8000/api/concerts', {
				statusCode: 200,
				body: [],
			})
			.as('getConcerts')
		cy
			.intercept('GET', 'http://localhost:8000/api/salaries', {
				fixture: 'initialSalaries.json',
			})
			.as('getSalaries')
		cy.wait('@getSalaries')
		cy.wait('@getConcerts')
		cy.get('[data-cy="salary-details-list"]').first().click()
		cy
			.intercept('GET', 'http://localhost:8000/api/concerts', {
				fixture: 'initialConcerts.json',
			})
			.as('getConcertsForEdit')
		cy.contains('Delete').click()
		cy
			.intercept('DELETE', 'http://localhost:8000/api/salaries/1', {
				statusCode: 200,
				body: {
					message: 'Salary has been successfully deleted',
				},
			})
			.as('deleteSalary')
		cy
			.intercept('GET', 'http://localhost:8000/api/salaries', {
				statusCode: 200,
				body: [],
			})
			.as('getSalariesAfterDelete')
		cy.get('[data-cy="salary-delete-submit"]').click()
		cy.wait('@deleteSalary')
		cy.wait('@getSalariesAfterDelete')
		cy.contains('.Toastify__toast-body', 'Salary has been successfully deleted')
		cy.get('[data-cy="empty-results-placeholder"]').should('be.visible')
	})
})
