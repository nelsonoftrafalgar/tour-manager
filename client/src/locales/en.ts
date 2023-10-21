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
		concerts: 'Concerts',
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
	tourManagers: {
		input_name_placeholder: 'Tour manager name',
	},
	concerts: {
		search_placeholder: 'Filter by name',
		add_new_concert: 'Add new concert',
		input_place_placeholder: 'Concert place',
		select_band_placeholder: 'Concert band',
		select_tourManager_placeholder: 'Concert tour manager',
		input_place_label: 'Place',
		select_band_label: 'Band',
		select_tourManager_label: 'Tour manager',
		header: {
			place: 'Place',
			band: 'Band',
			tourManager: 'Tour manager',
		},
	},
	forms: {
		required: 'This field is required',
		invalid_characters: 'Invalid characters',
		save: 'Save',
		add: 'Add',
		delete: 'Delete',
		cancel: 'Cancel',
		confirm_delete: 'Do you want to delete',
	},
} as const
