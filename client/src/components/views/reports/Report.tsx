'use client'

import { Accordion } from '@/components/ui/accordion/Accordion'
import { Box } from '@/components/ui/box/styles'
import { EmptyResults } from '@/components/ui/emptyResults/EmptyResults'
import { List } from './styles'
import { ReportCreate } from '@/components/forms/reportCreate/ReportCreate'
import { ReportData } from './types'
import { useReport } from './hooks'
import { useState } from 'react'

export const Report = () => {
	const [reportData, setReportData] = useState<ReportData | null>(null)
	const report = useReport(reportData)

	const handleReportData = (data: ReportData) => {
		setReportData((prev) => ({ ...prev, ...data }))
	}

	return (
		<Box>
			<ReportCreate handleReportData={handleReportData} />
			<List data-testid='concerts-list'>
				<EmptyResults entityType='reports' data={report}>
					{report && <Accordion items={report} />}
				</EmptyResults>
			</List>
		</Box>
	)
}
