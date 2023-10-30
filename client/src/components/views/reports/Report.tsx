'use client'

import { Accordion } from '@/components/ui/accordion/Accordion'
import { Box } from '@/components/ui/box/styles'
import { CreateReport } from '@/components/forms/createReport/CreateReport'
import { List } from './styles'
import { useReport } from './hooks'
import { useState } from 'react'

export interface ReportData {
	date: string
	concertId?: string
	bandId?: string
	tourManagerId?: string
}

export const Report = () => {
	const [reportData, setReportData] = useState<ReportData | null>(null)
	const report = useReport(reportData)

	const handleReportData = (data: ReportData) => {
		setReportData((prev) => ({ ...prev, ...data }))
	}

	return (
		<Box>
			<CreateReport handleReportData={handleReportData} />
			<List data-testid='concerts-list'>
				{report && <Accordion items={report} />}
			</List>
		</Box>
	)
}
