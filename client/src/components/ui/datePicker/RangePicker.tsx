import 'react-datepicker/dist/react-datepicker.css'

import { DatePickerWrapper, StyledLabel } from './styles'
import React, { useState } from 'react'

import DatePicker from 'react-datepicker'
import { useI18n } from '@/locales/client'

// TODO props types

export const RangePicker = () => {
	const t = useI18n()
	const [startDate, setStartDate] = useState<Date | null>(new Date())
	const [endDate, setEndDate] = useState<Date | null>(new Date())

	return (
		<>
			<StyledLabel>{t('ui.date')}</StyledLabel>
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
		</>
	)
}
