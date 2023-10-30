'use client'

import {
	ReportComment,
	ReportContentWrapper,
	ReportDetailsItem,
	ReportDetailsList,
} from './styles'

import { ReportData } from './Report'
import { Tooltip } from '@/components/ui/tooltip/Tooltip'
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
						<Tooltip title={concertDate}>
							<ReportDetailsItem>{concertDate}</ReportDetailsItem>
						</Tooltip>
						<Tooltip title={tourManager}>
							<ReportDetailsItem>{tourManager}</ReportDetailsItem>
						</Tooltip>
						<Tooltip title={place}>
							<ReportDetailsItem>{place}</ReportDetailsItem>
						</Tooltip>
						<Tooltip title={band}>
							<ReportDetailsItem>{band}</ReportDetailsItem>
						</Tooltip>
						<Tooltip title={amount.replace('$', '$ ')}>
							<ReportDetailsItem $amount>
								{amount.replace('$', '$ ')}
							</ReportDetailsItem>
						</Tooltip>
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
