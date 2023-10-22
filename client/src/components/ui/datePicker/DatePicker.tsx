'use client'

import 'react-datepicker/dist/react-datepicker.css'

import { DatePickerWrapper, ErrorMessage, StyledLabel } from './styles'

import DatePicker from 'react-datepicker'
import { DatePickerProps } from './types'
import { FC } from 'react'
import { useI18n } from '@/locales/client'

const DatePickerComponent: FC<DatePickerProps> = ({
	errorMessage,
	onChange,
	value,
}) => {
	const t = useI18n()
	const selected = value ? new Date(value) : null

	const handleDateChange = (date: Date) => {
		onChange(date.toISOString())
	}

	return (
		<div>
			<StyledLabel>{t('ui.date')}</StyledLabel>
			<DatePickerWrapper $error={!!errorMessage}>
				<DatePicker
					selected={selected}
					onChange={handleDateChange}
					dateFormat={'dd/MM/yyyy'}
					placeholderText={t('forms.date_placeholder')}
				/>
			</DatePickerWrapper>
			{errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
		</div>
	)
}

export { DatePickerComponent as DatePicker }
