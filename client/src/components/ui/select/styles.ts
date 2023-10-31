'use client'

import * as Select from '@radix-ui/react-select'

import styled, { css } from 'styled-components'

import { ChevronDownIcon } from '@radix-ui/react-icons'
import { Label } from '@radix-ui/react-label'

interface SelectTriggerProps {
	$open: boolean
	$error?: boolean
}

export const SelectTrigger = styled(Select.Trigger)<SelectTriggerProps>`
	margin-bottom: ${({ $error }) => ($error ? 0 : 25)}px;
	padding: ${({ theme }) => theme.gridUnit * 2.5}px;
	font-size: ${({ theme }) => theme.fonts.size.xs}px;
	background-color: ${({ theme }) => theme.colors.primary.white};
	border: 2px solid ${({ theme }) => theme.colors.border};
	border-radius: ${({ theme }) => theme.borderRadius}px;
	display: inline-flex;
	justify-content: space-between;
	align-items: center;
	column-gap: ${({ theme }) => theme.gridUnit * 2}px;
	${({ theme, $error }) =>
		$error &&
		css`
			border-color: ${theme.colors.secondary.strawberry};
		`}
	cursor: pointer;
	width: 200px;
	${({ $open }) =>
		$open &&
		css`
			border-bottom-right-radius: 0;
			border-bottom-left-radius: 0;
		`}
	&[data-placeholder] {
		color: ${({ theme }) => theme.colors.placeholder};
	}
`

export const SelectIcon = styled(ChevronDownIcon)`
	display: flex;
	align-items: center;
	stroke: ${({ theme }) => theme.colors.primary.orange};
`

export const SelectContent = styled(Select.Content)`
	background-color: ${({ theme }) => theme.colors.primary.white};
	border-radius: ${({ theme }) => theme.borderRadius}px;
	border: 2px solid ${({ theme }) => theme.colors.border};
	border-top-right-radius: 0;
	border-top-left-radius: 0;
	border-top: 0;
	max-height: 100px;
	width: 200px;
	z-index: 10;
`

export const SelectItem = styled(Select.Item)`
	padding: ${({ theme }) => theme.gridUnit * 1.5}px;
	padding-left: ${({ theme }) => theme.gridUnit * 2.5}px;
	font-size: ${({ theme }) => theme.fonts.size.xs}px;
	display: flex;
	align-items: center;
	gap: ${({ theme }) => theme.gridUnit * 2}px;

	&:focus {
		background-color: ${({ theme }) => theme.colors.primary.orange};
		color: ${({ theme }) => theme.colors.primary.white};
		outline: none;
	}
`

export const StyledLabel = styled(Label)`
	color: ${({ theme }) => theme.colors.primary.charchoal};
	font-size: ${({ theme }) => theme.fonts.size.xs}px;
	font-weight: ${({ theme }) => theme.fonts.weight.bold};
	display: block;
	margin-bottom: ${({ theme }) => theme.gridUnit * 2.5}px;
`

export const ErrorMessage = styled.span`
	color: ${({ theme }) => theme.colors.secondary.strawberry};
	font-size: ${({ theme }) => theme.fonts.size.xs}px;
	margin-left: ${({ theme }) => theme.gridUnit * 3}px;
	display: inline-block;
	margin-top: ${({ theme }) => theme.gridUnit * 2.5}px;
`

export const SelectWrapper = styled.div`
	display: flex;
	flex-direction: column;
`
