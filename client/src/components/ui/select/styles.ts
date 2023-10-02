'use client'

import * as Select from '@radix-ui/react-select'

import styled, { css } from 'styled-components'

import { ChevronDownIcon } from '@radix-ui/react-icons'

export const SelectTrigger = styled(Select.Trigger)<{ $open: boolean }>`
	padding: ${({ theme }) => theme.gridUnit * 2.5}px;
	font-size: ${({ theme }) => theme.fonts.size.xs}px;
	font-weight: ${({ theme }) => theme.fonts.weight.bold};
	background-color: ${({ theme }) => theme.colors.primary.white};
	border: 2px solid ${({ theme }) => theme.colors.border};
	border-radius: ${({ theme }) => theme.borderRadius}px;
	display: inline-flex;
	justify-content: space-between;
	align-items: center;
	column-gap: ${({ theme }) => theme.gridUnit * 2}px;
	cursor: pointer;
	width: 200px;
	${({ $open }) =>
		$open &&
		css`
			border-bottom-right-radius: 0;
			border-bottom-left-radius: 0;
		`}
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
	height: 100px;
	width: 200px;
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
