export interface ConcertCreateFormData {
	place: string
	date: string
	bandId: string
	tourManagerId: string
}

export interface ConcertCreateProps {
	handleModalClose: () => void
}
