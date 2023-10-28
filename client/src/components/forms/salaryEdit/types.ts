export interface SalaryEditProps {
	id: string
	concertId: string
	amount: string
	comment: string
	handleModalClose: () => void
}

export interface SalaryEditFormData {
	concertId: string
	amount: string
	comment: string
}
