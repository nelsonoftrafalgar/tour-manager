export interface ReportCreateFormData {
	date: string
	concertId?: string
	bandId?: string
	tourManagerId?: string
}

export interface ReportCreateProps {
	handleReportData: (data: ReportCreateFormData) => void
}
