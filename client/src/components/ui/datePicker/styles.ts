'use client'

import { Label } from '@radix-ui/react-label'
import styled from 'styled-components'

export const DatePickerWrapper = styled.div<{ $error?: boolean }>`
	margin-bottom: ${({ $error }) => ($error ? 0 : 25)}px;
	display: flex;
	gap: ${({ theme }) => theme.gridUnit}px;
	align-items: center;

	.react-datepicker__triangle {
		display: none;
	}
	.react-datepicker {
		border-radius: ${({ theme }) => theme.borderRadius}px;
		border: 2px solid ${({ theme }) => theme.colors.border};
	}
	.react-datepicker__header {
		border-top-right-radius: ${({ theme }) => theme.borderRadius}px;
		border-top-left-radius: ${({ theme }) => theme.borderRadius}px;
		border-bottom: 2px solid ${({ theme }) => theme.colors.border};
		background-color: ${({ theme }) => theme.colors.primary.white};
	}
	.react-datepicker__navigation-icon::before {
		border-color: ${({ theme }) => theme.colors.primary.orange};
	}
	.react-datepicker__current-month {
		font-size: ${({ theme }) => theme.fonts.size.xs}px;
	}
	.react-datepicker__day-name {
		font-size: ${({ theme }) => theme.fonts.size.xs}px;
	}
	.react-datepicker__day {
		border-radius: 0;
	}
	.react-datepicker__day--in-selecting-range {
		background-color: ${({ theme }) => theme.colors.primary.orange};
	}
	.react-datepicker__day--selected {
		background-color: ${({ theme }) => theme.colors.primary.orange};
	}
	input {
		border: 2px solid ${({ theme }) => theme.colors.border};
		padding: ${({ theme }) => theme.gridUnit * 2.5}px;
		border-radius: ${({ theme }) => theme.borderRadius}px;
		outline: none;

		&:focus-visible {
			border: 2px solid ${({ theme }) => theme.colors.primary.charchoal};
		}
	}
`
export const StyledLabel = styled(Label)`
	color: ${({ theme }) => theme.colors.primary.charchoal};
	font-size: ${({ theme }) => theme.fonts.size.xs}px;
	font-weight: ${({ theme }) => theme.fonts.weight.bold};
	display: flex;
	gap: 140px;
	margin-bottom: ${({ theme }) => theme.gridUnit * 2.5}px;
`

export const ErrorMessage = styled.span`
	color: ${({ theme }) => theme.colors.secondary.strawberry};
	font-size: ${({ theme }) => theme.fonts.size.xs}px;
	margin-left: ${({ theme }) => theme.gridUnit * 3}px;
	display: inline-block;
	margin-top: ${({ theme }) => theme.gridUnit * 2.5}px;
`
