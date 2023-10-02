'use client'

import { ErrorMessage, StyledInput, StyledLabel } from './styles'

import { FC } from 'react'
import { InputProps } from './types'

export const Input: FC<InputProps> = ({
	errorMessage,
	label,
	placeholder,
	type = 'text',
	value,
	onChange,
}) => {
	return (
		<div>
			{label && <StyledLabel htmlFor={label}>{label}</StyledLabel>}
			<StyledInput
				value={value}
				$error={!!errorMessage}
				type={type}
				id={label}
				placeholder={placeholder}
				onChange={onChange}
			/>
			{errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
		</div>
	)
}
