export interface ReportCreateFormData {
	date: string
	concertId?: string
	bandId?: string
	tourManagerId?: string
}

export interface CreateReportProps {
	handleReportData: (data: ReportCreateFormData) => void
}
