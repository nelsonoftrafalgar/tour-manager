import { ButtonHTMLAttributes, ReactElement } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	buttonStyle: 'primary' | 'secondary' | 'warning'
	disabled?: boolean
	children:
		| [ReactElement | false, string]
		| [string, ReactElement | false]
		| string
}

export interface StyledButtonProps
	extends ButtonHTMLAttributes<HTMLButtonElement> {
	$type: 'primary' | 'secondary' | 'warning'
	$hasLeftIcon: boolean
	$hasRightIcon: boolean
}
