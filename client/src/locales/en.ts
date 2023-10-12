export default {
	hello: 'Hello',
	welcome: 'Hello {name}!',

	ui: {
		amount: 'Amount',
		date: 'Date',
	},
	routes: {
		bands: 'Bands',
		tour_managers: 'Tour Managers',
	},
	bands: {
		search_placeholder: 'Filter by name',
		add_new_band: 'Add new band',
		input_name_placeholder: 'Band name',
		input_frontMan_placeholder: 'Band frontman',
		input_name_label: 'Name',
		input_frontMan_label: 'Frontman',
		delete_band: 'Delete band',
	},
	forms: {
		required: 'This field is required',
		save: 'Save',
		add: 'Add',
		delete: 'Delete',
		cancel: 'Cancel',
		confirm_delete: 'Do you want to delete',
	},
} as const
