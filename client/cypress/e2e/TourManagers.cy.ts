describe('Tour managers view', () => {
	beforeEach(() => {
		cy.visit('/en/tour-managers')
		cy
			.intercept('GET', 'http://localhost:8000/api/tour_managers', {
				fixture: 'initialTourManagers.json',
			})
			.as('getTourManagers')
		cy.wait('@getTourManagers')
	})
	it('should contain a list of tour managers', () => {
		cy.get('[data-cy=tour-manager-list]').children().should('have.length', 4)
		cy.get('[data-cy=tour-manager-create-trigger]').should('be.visible')
		cy.contains('First tour manager').should('be.visible')
		cy.contains('Second tour manager').should('be.visible')
		cy.contains('Third tour manager').should('be.visible')
	})

	it('should delete tour manager', () => {
		cy
			.intercept('DELETE', 'http://localhost:8000/api/tour_managers/1', {
				statusCode: 200,
				body: { message: 'First tour manager has been successfully deleted' },
			})
			.as('deleteTourManager')
		cy
			.intercept('GET', 'http://localhost:8000/api/tour_managers', {
				statusCode: 200,
				body: [
					{ id: 2, name: 'Second tour manager' },
					{ id: 3, name: 'Third tour manager' },
				],
			})
			.as('getTourManagers2')

		cy.get('[data-cy=tour-manager-list-item]').should('have.length', 3)
		cy.get('[data-cy=delete-tour-manager-icon]').first().click({ force: true })
		cy.wait('@deleteTourManager')
		cy.wait('@getTourManagers2')
		cy.contains(
			'.Toastify__toast-body',
			'First tour manager has been successfully deleted'
		)
		cy.get('[data-cy=tour-manager-list-item]').should('have.length', 2)
	})

	it('should edit tour manager', () => {
		cy
			.get('[data-cy=tour-manager-name]')
			.first()
			.should('include.text', 'First tour manager')
		cy.get('[data-cy=edit-tour-manager-icon]').first().click({ force: true })
		cy.get('[value="First tour manager"]').clear().type('Updated tour manager')
		cy
			.intercept('PUT', 'http://localhost:8000/api/tour_managers', {
				statusCode: 200,
				body: { message: 'Tour manager has been successfully updated' },
			})
			.as('updateTourManager')
		cy
			.intercept('GET', 'http://localhost:8000/api/tour_managers', {
				statusCode: 200,
				body: [
					{ id: 1, name: 'Updated tour manager' },
					{ id: 2, name: 'Second tour manager' },
					{ id: 3, name: 'Third tour manager' },
				],
			})
			.as('getTourManagers2')
		cy.get('[data-cy=tour-manager-save-edit-icon]').click()
		cy.wait('@updateTourManager')
		cy.wait('@getTourManagers2')
		cy.contains(
			'.Toastify__toast-body',
			'Tour manager has been successfully updated'
		)
		cy
			.get('[data-cy=tour-manager-name]')
			.first()
			.should('include.text', 'Updated tour manager')
	})

	it('should create new tour manager', () => {
		cy.get('[data-cy=tour-manager-create-trigger]').click()
		cy.get('[placeholder="Tour manager name"]').type('New tour manager')
		cy
			.intercept('POST', 'http://localhost:8000/api/tour_managers', {
				statusCode: 200,
				body: { message: 'Tour manager has been successfully created' },
			})
			.as('createTourManager')
		cy
			.intercept('GET', 'http://localhost:8000/api/tour_managers', {
				statusCode: 200,
				body: [
					{ id: 1, name: 'First tour manager' },
					{ id: 2, name: 'Second tour manager' },
					{ id: 3, name: 'Third tour manager' },
					{ id: 4, name: 'New tour manager' },
				],
			})
			.as('getTourManagers2')
		cy.get('[data-cy=tour-manager-submit-create]').click({ force: true })
		cy.wait('@createTourManager')
		cy.wait('@getTourManagers2')
		cy.contains(
			'.Toastify__toast-body',
			'Tour manager has been successfully created'
		)
		cy.get('[data-cy=tour-manager-list]').children().should('have.length', 5)
		cy
			.get('[data-cy=tour-manager-name]')
			.last()
			.should('include.text', 'New tour manager')
	})
})

describe('Tour manager edit form', () => {
	it('should validate tour manager name', () => {
		cy.visit('/en/tour-managers')
		cy
			.intercept('GET', 'http://localhost:8000/api/tour_managers', {
				fixture: 'initialTourManagers.json',
			})
			.as('getTourManagers')
		cy.wait('@getTourManagers')
		cy.get('[data-cy=edit-tour-manager-icon]').first().click({ force: true })
		cy.get('[value="First tour manager"]').clear().type('Updated tour manager!')
		cy.get('[data-cy=tour-manager-save-edit-icon]').click()
		cy.contains('Invalid characters').should('be.visible')
		cy.get('[value="Updated tour manager!"]').clear()
		cy.get('[data-cy=tour-manager-save-edit-icon]').click()
		cy.contains('This field is required').should('be.visible')
	})
})

describe('Tour manager create form', () => {
	it('should validate tour manager name', () => {
		cy.visit('/en/tour-managers')
		cy
			.intercept('GET', 'http://localhost:8000/api/tour_managers', {
				fixture: 'initialTourManagers.json',
			})
			.as('getTourManagers')
		cy.wait('@getTourManagers')

		cy.get('[data-cy=tour-manager-create-trigger]').click()
		cy.get('[placeholder="Tour manager name"]').type('New tour manager!')
		cy.get('[data-cy=tour-manager-submit-create]').click({ force: true })
		cy.contains('Invalid characters').should('be.visible')
		cy.get('[value="New tour manager!"]').clear()
		cy.contains('This field is required').should('be.visible')
	})
})

describe('Tour managers should propelry display error toast', () => {
	beforeEach(() => {
		cy.visit('/en/tour-managers')
		cy
			.intercept('GET', 'http://localhost:8000/api/tour_managers', {
				fixture: 'initialTourManagers.json',
			})
			.as('getTourManagers')
		cy.wait('@getTourManagers')
	})
	it('when DELETE returns 404', () => {
		cy
			.intercept('DELETE', 'http://localhost:8000/api/tour_managers/1', {
				statusCode: 404,
				body: { message: 'Tour manager not found' },
			})
			.as('deleteTourManager')
		cy.get('[data-cy=delete-tour-manager-icon]').first().click({ force: true })
		cy.contains('.Toastify__toast-body', 'Tour manager not found')
	})
	it('when DELETE returns 400', () => {
		cy
			.intercept('DELETE', 'http://localhost:8000/api/tour_managers/1', {
				statusCode: 400,
				body: { error: 'Bad Request' },
			})
			.as('deleteTourManager')
		cy.get('[data-cy=delete-tour-manager-icon]').first().click({ force: true })
		cy.contains('.Toastify__toast-body', 'Bad Request')
	})
	it('when POST returns 400', () => {
		cy.get('[data-cy=tour-manager-create-trigger]').click()
		cy.get('[placeholder="Tour manager name"]').type('New tour manager')
		cy
			.intercept('POST', 'http://localhost:8000/api/tour_managers', {
				statusCode: 400,
				body: { error: 'Bad Request' },
			})
			.as('createTourManager')
		cy.get('[data-cy=tour-manager-submit-create]').click({ force: true })
		cy.wait('@createTourManager')
		cy.contains('.Toastify__toast-body', 'Bad Request')
	})
	it('when POST returns 409', () => {
		cy.get('[data-cy=tour-manager-create-trigger]').click()
		cy.get('[placeholder="Tour manager name"]').type('First tour manager')
		cy
			.intercept('POST', 'http://localhost:8000/api/tour_managers', {
				statusCode: 409,
				body: { message: 'Tour manager already exists' },
			})
			.as('createTourManager')
		cy.get('[data-cy=tour-manager-submit-create]').click({ force: true })

		cy.wait('@createTourManager')
		cy.contains('.Toastify__toast-body', 'Tour manager already exists')
	})
	it('when PUT returns 400', () => {
		cy.get('[data-cy=edit-tour-manager-icon]').first().click({ force: true })
		cy.get('[value="First tour manager"]').clear().type('Updated tour manager')
		cy
			.intercept('PUT', 'http://localhost:8000/api/tour_managers', {
				statusCode: 400,
				body: { error: 'Bad Request' },
			})
			.as('updateTourManager')
		cy.get('[data-cy=tour-manager-save-edit-icon]').click()
		cy.wait('@updateTourManager')
		cy.contains('.Toastify__toast-body', 'Bad Request')
	})
	it('when PUT returns 409', () => {
		cy.get('[data-cy=edit-tour-manager-icon]').first().click({ force: true })
		cy.get('[value="First tour manager"]').clear().type('Second tour manager')
		cy
			.intercept('PUT', 'http://localhost:8000/api/tour_managers', {
				statusCode: 409,
				body: { message: 'Tour manager already exists' },
			})
			.as('updateTourManager')
		cy.get('[data-cy=tour-manager-save-edit-icon]').click()
		cy.wait('@updateTourManager')
		cy.contains('.Toastify__toast-body', 'Tour manager already exists')
	})
})

describe('Tour managers should handle error', () => {
	it('when GET returns 404', () => {
		cy.visit('/en/tour-managers')
		cy.intercept('GET', 'http://localhost:8000/api/tour_managers', {
			statusCode: 404,
			body: { error: 'Not Found' },
		})
		cy.contains('.Toastify__toast-body', 'Not Found')
	})
})
