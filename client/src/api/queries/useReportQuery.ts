import { AxiosResponse } from 'axios'
import client from '../client'
import { useQuery } from '@tanstack/react-query'

export interface ReportCreateRequest {
	date: string
	concertId?: string
	bandId?: string
	tourManagerId?: string
}

export interface Report {
	id: string
	amount: string
	comment: string
	band: { name: string }
	concert: { place: string; date: string }
	tourManager: { name: string }
}

export const getReport = (params: ReportCreateRequest | null) =>
	client.get('salaries/report', { params })

export const useReportQuery = (data: ReportCreateRequest | null) => {
	return useQuery<AxiosResponse<Report[], ReportCreateRequest | null>>({
		queryKey: ['report', data],
		queryFn: () => getReport(data),
		enabled: false,
	})
}
