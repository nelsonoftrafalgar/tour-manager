'use client'

import 'react-datepicker/dist/react-datepicker.css'

import { DatePickerWrapper, StyledLabel } from './styles'
import React, { FC, useEffect, useState } from 'react'

import DatePicker from 'react-datepicker'
import { RangePickerProps } from './types'
import { useI18n } from '@/locales/client'

export const RangePicker: FC<RangePickerProps> = ({ onChange }) => {
	const t = useI18n()
	const [startDate, setStartDate] = useState<Date | null>(new Date())
	const [endDate, setEndDate] = useState<Date | null>(
		new Date(new Date().setDate(new Date().getDate() + 30))
	)

	useEffect(() => {
		onChange(`${startDate?.toISOString()}_${endDate?.toISOString()}`)
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
					onChange={setStartDate}
					selectsStart
					startDate={startDate}
					endDate={endDate}
					dateFormat={'dd/MM/yyyy'}
				/>
				<div>-</div>
				<DatePicker
					selected={endDate}
					onChange={setEndDate}
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
