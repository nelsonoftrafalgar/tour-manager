import { Button } from '@radix-ui/themes'
import { ButtonHTMLAttributes } from 'react'
import styled from 'styled-components'

interface StyledButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	$type: 'primary' | 'secondary' | 'warning'
	$hasLeftIcon: boolean
	$hasRightIcon: boolean
}

export const StyledButton = styled(Button)<StyledButtonProps>`
	background-color: ${({ theme, $type }) =>
		$type === 'primary' && theme.colors.primary.orange};
	background-color: ${({ theme, $type }) =>
		$type === 'secondary' && theme.colors.secondary.mint};
	background-color: ${({ theme, $type }) =>
		$type === 'warning' && theme.colors.secondary.strawberry};
	padding-block: ${({ theme }) => theme.gridUnit * 2.5}px;
	padding-inline: ${({ theme }) => theme.gridUnit * 10}px;
	font-size: ${({ theme }) => theme.fonts.size.s}px;
	font-family: ${({ theme }) => theme.fonts.family.avenirBlack};
	text-transform: uppercase;
	color: ${({ theme }) => theme.colors.primary.white};
	border-radius: ${({ theme }) => theme.gridUnit * 2}px;
	cursor: pointer;
	&:hover:not(:disabled) {
		opacity: 0.7;
	}
	transition: opacity 0.3s;
	&:disabled {
		background-color: ${({ theme }) => theme.colors.disabled};
		cursor: not-allowed;
	}
	display: flex;
	svg {
		margin-left: ${({ theme, $hasRightIcon }) =>
			$hasRightIcon ? theme.gridUnit * 2 : 0}px;
		margin-right: ${({ theme, $hasLeftIcon }) =>
			$hasLeftIcon ? theme.gridUnit * 2 : 0}px;
	}
`
