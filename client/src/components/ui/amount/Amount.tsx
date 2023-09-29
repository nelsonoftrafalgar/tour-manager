'use client'

import { ChangeEvent, FC, useState } from 'react'

import { AmountProps } from './types'
import { Input } from '../input/Input'
import { formatValue } from './utils'
import { useI18n } from '@/locales/client'

export const Amount: FC<AmountProps> = ({ label, value }) => {
	const t = useI18n()
	const [amount, setAmount] = useState(() => formatValue(value))

	const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.value.replace(/[^.0-9]/g, '')
		setAmount(formatValue(inputValue))
	}

	return (
		<Input
			value={amount}
			label={label}
			placeholder={t('ui.amount')}
			onChange={handleAmountChange}
		/>
	)
}
