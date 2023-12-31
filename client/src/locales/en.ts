export default {
	ui: {
		amount: 'Amount',
		date: 'Date',
		start_date: 'Start date',
		end_date: 'End Date',
		empty_state: 'The are no {type}',
	},
	routes: {
		bands: 'Bands',
		tour_managers: 'Tour Managers',
		concerts: 'Concerts',
		salaries: 'Salaries',
		reports: 'Reports',
	},
	mobileRoutes: {
		bands: 'B',
		tour_managers: 'T',
		concerts: 'C',
		salaries: 'S',
		reports: 'R',
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
		search_placeholder: 'Filter by place',
		add_new_concert: 'Add new concert',
		input_place_placeholder: 'Concert place',
		select_band_placeholder: 'Select band',
		select_tourManager_placeholder: 'Select tour manager',
		input_place_label: 'Place',
		select_band_label: 'Band',
		select_tourManager_label: 'Tour manager',
		header: {
			place: 'Place',
			date: 'Date',
			band: 'Band',
			tourManager: 'Tour manager',
		},
		delete_concert: 'Delete concert',
	},
	salaries: {
		header: {
			date: 'Date',
			tourManager: 'Tour manager',
			concert: 'Concert',
			band: 'Band',
			amount: 'Amount',
		},
		create_new_salary: 'Create new salary',
		select_concert_palceholder: 'Select concert place',
		select_concert_label: 'Concert',
		concert_details_band: 'Band',
		concert_details_tourManager: 'Tour manager',
		concert_details_date: 'Date',
		amount_label: 'Amount',
		comment_label: 'Comment',
		comment_placeholder: 'Add comment',
		delete_salary: 'Delete salary',
		edit_salary: 'Edit salary',
	},
	reports: {
		select_concert_placeholder: 'Select concert',
		select_concert_label: 'Concert',
		create_report: 'Create report',
	},
	forms: {
		required: 'This field is required',
		range_required: 'Date range is required',
		invalid_characters: 'Invalid characters',
		save: 'Save',
		add: 'Add',
		create: 'Create',
		delete: 'Delete',
		cancel: 'Cancel',
		edit: 'Edit',
		confirm_delete: 'Do you want to delete',
		confirm_delete_concert: 'Do you want to delete concert?',
		date_placeholder: 'Pick date',
	},
} as const
