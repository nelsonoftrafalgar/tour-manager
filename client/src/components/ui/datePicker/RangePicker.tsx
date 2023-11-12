'use client'

import 'react-datepicker/dist/react-datepicker.css'

import { DatePickerWrapper, StyledLabel } from './styles'
import React, { FC, useEffect, useState } from 'react'

import DatePicker from 'react-datepicker'
import { RangePickerProps } from './types'
import { formatDate } from './utils'
import { useI18n } from '@/locales/client'

export const RangePicker: FC<RangePickerProps> = ({ onChange }) => {
	const t = useI18n()
	const [startDate, setStartDate] = useState(new Date())
	const [endDate, setEndDate] = useState(
		new Date(new Date().setDate(new Date().getDate() + 30))
	)

	const handleStartDate = (date: Date) => setStartDate(date)
	const handleEndDate = (date: Date) => setEndDate(date)

	useEffect(() => {
		onChange(`${formatDate(startDate)}_${formatDate(endDate)}`)
	}, [startDate, endDate, onChange])

	return (
		<div>
			<StyledLabel>
				<span>{t('ui.start_date')}</span>
				<span>{t('ui.end_date')}</span>
			</StyledLabel>
			<DatePickerWrapper>
				<DatePicker
					selected={startDate}
					onChange={handleStartDate}
					selectsStart
					startDate={startDate}
					endDate={endDate}
					dateFormat={'dd/MM/yyyy'}
				/>
				<div>-</div>
				<DatePicker
					selected={endDate}
					onChange={handleEndDate}
					selectsEnd
					startDate={startDate}
					endDate={endDate}
					minDate={startDate}
					dateFormat={'dd/MM/yyyy'}
				/>
			</DatePickerWrapper>
		</div>
	)
}
