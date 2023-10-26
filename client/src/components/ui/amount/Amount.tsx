'use client'

import { ChangeEvent, FC } from 'react'

import { AmountProps } from './types'
import { Input } from '../input/Input'
import { formatValue } from './utils'
import { useI18n } from '@/locales/client'

export const Amount: FC<AmountProps> = ({
	label,
	value,
	errorMessage,
	onChange,
}) => {
	const t = useI18n()

	const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.value.replace(/[^.0-9]/g, '')
		onChange(formatValue(inputValue))
	}

	return (
		<Input
			value={value}
			label={label}
			placeholder={t('ui.amount')}
			onChange={handleAmountChange}
			errorMessage={errorMessage}
		/>
	)
}
