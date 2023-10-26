'use client'

import {
	CharCounter,
	ErrorMessage,
	StyledLabel,
	StyledTextarea,
	TextAreaWrapper,
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
		<TextAreaWrapper>
			<StyledLabel htmlFor={label}>{label}</StyledLabel>
			<StyledTextarea
				value={value}
				$error={!!errorMessage}
				placeholder={placeholder}
				onChange={onChange}
			/>
			<CharCounter>
				{value.length}/{MAX_CHARACTER_COUNT}
			</CharCounter>
			{errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
		</TextAreaWrapper>
	)
}
