'use client'

import { Children, FC } from 'react'

import { ButtonProps } from './types'
import { StyledButton } from './styles'

export const Button: FC<ButtonProps> = ({
	children,
	buttonStyle,
	disabled,
	...props
}) => {
	const [_, second] = Children.toArray(children)
	const hasLeftIcon = typeof second === 'string'
	const hasRightIcon = typeof second === 'object'

	return (
		<StyledButton
			{...props}
			disabled={disabled}
			$hasRightIcon={hasRightIcon}
			$hasLeftIcon={hasLeftIcon}
			$type={buttonStyle}
		>
			{children}
		</StyledButton>
	)
}
