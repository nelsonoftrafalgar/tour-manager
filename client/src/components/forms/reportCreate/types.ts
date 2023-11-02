import { Band } from '@/api/queries/useBandsQuery'
import { Concert } from '@/api/queries/useConcertsQuery'
import { TourManager } from '@/api/queries/useTourManagerQuery'

export interface ReportCreateFormData {
	date: string
	concertId?: string
	bandId?: string
	tourManagerId?: string
}

export interface ReportCreateProps {
	handleReportData: (data: ReportCreateFormData) => void
}

export interface GetSelectOptionsParams {
	concerts: Concert[]
	concertId?: string
	bands: Band[]
	bandId?: string
	tourManagers: TourManager[]
	tourManagerId?: string
}
