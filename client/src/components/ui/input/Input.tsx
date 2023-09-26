import { ErrorMessage, StyledInput, StyledLabel } from './styles'

import { FC } from 'react'
import { InputProps } from './types'

export const Input: FC<InputProps> = ({
	errorMessage,
	label,
	placeholder,
	type = 'text',
}) => {
	return (
		<>
			<StyledLabel htmlFor={label}>{label}</StyledLabel>
			<StyledInput
				$error={!!errorMessage}
				type={type}
				id={label}
				placeholder={placeholder}
			/>
			{errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
		</>
	)
}
