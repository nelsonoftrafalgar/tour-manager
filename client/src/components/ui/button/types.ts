import { ButtonHTMLAttributes, ReactElement } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	buttonStyle: 'primary' | 'secondary' | 'warning'
	disabled?: boolean
	children:
		| [ReactElement | false, string]
		| [string, ReactElement | false]
		| string
}
