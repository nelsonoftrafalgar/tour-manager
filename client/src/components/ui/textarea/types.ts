import { ChangeEvent } from 'react'

export interface TextareaProps {
	errorMessage?: string
	label: string
	placeholder?: string
	value: string
	onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
}
