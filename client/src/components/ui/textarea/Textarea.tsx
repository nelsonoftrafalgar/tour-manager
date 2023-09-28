import {
	CharCounter,
	ErrorMessage,
	StyledLabel,
	StyledTextarea,
} from './styles'

import { FC } from 'react'
import { TextareaProps } from './types'

const MAX_CHARACTER_COUNT = 250

export const Textarea: FC<TextareaProps> = ({
	label,
	placeholder,
	errorMessage,
	value,
	onChange,
}) => {
	return (
		<>
			<StyledLabel htmlFor={label}>
				{label}
				<StyledTextarea
					value={value}
					$error={!!errorMessage}
					placeholder={placeholder}
					onChange={onChange}
				/>
				<CharCounter>
					{value.length}/{MAX_CHARACTER_COUNT}
				</CharCounter>
			</StyledLabel>
			{errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
		</>
	)
}
