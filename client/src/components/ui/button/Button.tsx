'use client'

import { Children, FC, Ref, forwardRef } from 'react'

import { ButtonProps } from './types'
import { StyledButton } from './styles'

export const Button: FC<ButtonProps> = forwardRef(
	(
		{ children, buttonStyle, disabled, ...props }: ButtonProps,
		ref: Ref<HTMLButtonElement>
	) => {
		const [_, second] = Children.toArray(children)
		const hasLeftIcon = typeof second === 'string'
		const hasRightIcon = typeof second === 'object'

		return (
			<StyledButton
				{...props}
				ref={ref}
				disabled={disabled}
				$hasRightIcon={hasRightIcon}
				$hasLeftIcon={hasLeftIcon}
				$type={buttonStyle}
			>
				{children}
			</StyledButton>
		)
	}
)

Button.displayName = 'Button'
