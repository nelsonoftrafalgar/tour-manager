'use client'

import 'react-datepicker/dist/react-datepicker.css'

import { DatePickerWrapper, StyledLabel } from './styles'
import React, { useState } from 'react'

import DatePicker from 'react-datepicker'
import { useI18n } from '@/locales/client'

// TODO props types

const DatePickerComponent = () => {
	const t = useI18n()
	const [date, setDate] = useState<Date | null>(new Date())

	return (
		<>
			<StyledLabel>{t('ui.date')}</StyledLabel>
			<DatePickerWrapper>
				<DatePicker selected={date} onChange={setDate} dateFormat={'dd/MM/yyyy'} />
			</DatePickerWrapper>
		</>
	)
}

export { DatePickerComponent as DatePicker }
