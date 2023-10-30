'use client'

import {
	ReportComment,
	ReportContentWrapper,
	ReportDetailsItem,
	ReportDetailsList,
} from './styles'

import { ReportData } from './Report'
import { format } from 'date-fns'
import { useEffect } from 'react'
import { useReportQuery } from '@/api/queries/useReportQuery'

export const useReport = (reportData: ReportData | null) => {
	const { data: report, refetch } = useReportQuery(reportData)

	useEffect(() => {
		if (reportData) refetch()
	}, [reportData, refetch])

	return report?.data?.map(
		({
			id,
			concert: { date, place },
			band: { name: band },
			tourManager: { name: tourManager },
			amount,
			comment,
		}) => {
			const concertDate = format(new Date(date), 'dd-MM-yyy')
			return {
				id,
				header: (
					<ReportDetailsList>
						<ReportDetailsItem>{concertDate}</ReportDetailsItem>
						<ReportDetailsItem>{tourManager}</ReportDetailsItem>
						<ReportDetailsItem>{place}</ReportDetailsItem>
						<ReportDetailsItem>{band}</ReportDetailsItem>
						<ReportDetailsItem $amount>{amount.replace('$', '$ ')}</ReportDetailsItem>
					</ReportDetailsList>
				),
				content: (
					<>
						<ReportContentWrapper>
							<ReportComment>{comment}</ReportComment>
						</ReportContentWrapper>
					</>
				),
			}
		}
	)
}
