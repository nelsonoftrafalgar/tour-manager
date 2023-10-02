import { ChangeEvent } from 'react'

export interface InputProps {
	errorMessage?: string
	label?: string
	placeholder?: string
	type?: string
	value: string
	onChange: (e: ChangeEvent<HTMLInputElement>) => void
}
