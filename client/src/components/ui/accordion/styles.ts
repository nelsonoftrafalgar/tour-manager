'use client'

import * as Accordion from '@radix-ui/react-accordion'

import styled, { keyframes } from 'styled-components'

import { ChevronDownIcon } from '@radix-ui/react-icons'

export const AccordionRoot = styled(Accordion.Root)`
	border-radius: ${({ theme }) => theme.borderRadius}px;
	border: 1px solid ${({ theme }) => theme.colors.border};
	border-bottom: none;
`

export const AccordionItem = styled(Accordion.Item)`
	border-bottom: 1px solid ${({ theme }) => theme.colors.border};
	&:first-child {
		border-top-left-radius: ${({ theme }) => theme.borderRadius}px;
		border-top-right-radius: ${({ theme }) => theme.borderRadius}px;
	}

	&:last-child {
		border-bottom-left-radius: ${({ theme }) => theme.borderRadius}px;
		border-bottom-right-radius: ${({ theme }) => theme.borderRadius}px;
	}
`

export const StyledTrigger = styled(Accordion.Trigger)`
	padding: ${({ theme }) => theme.gridUnit * 4}px;
	width: 100%;
	text-align: start;
	background-color: ${({ theme }) => theme.colors.primary.white};
	border-radius: ${({ theme }) => theme.borderRadius}px;
	font-weight: ${({ theme }) => theme.fonts.weight.bold};
	justify-content: space-between;
	display: flex;
	&[data-state='open'] svg {
		transform: rotate(180deg);
	}
`

export const StyledHeader = styled(Accordion.Header)`
	display: flex;
`
export const StyledChevron = styled(ChevronDownIcon)`
	transition: transform 300ms cubic-bezier(0.87, 0, 0.13, 1);
	stroke: ${({ theme }) => theme.colors.primary.orange};
`

const slideDown = keyframes`
	from { height: 0 };
	to { height: var(--radix-accordion-content-height) };
  `

const slideUp = keyframes`
	from { height: var(--radix-accordion-content-height) };
	to { height: 0 };
`

export const StyledContent = styled(Accordion.Content)`
	overflow: hidden;
	width: 100%;
	border-top: 1px solid ${({ theme }) => theme.colors.border};

	&[data-state='open'] {
		animation: ${slideDown} 300ms cubic-bezier(0.87, 0, 0.13, 1);
	}
	&[data-state='closed'] {
		animation: ${slideUp} 300ms cubic-bezier(0.87, 0, 0.13, 1);
	}
`

export const StyledContentText = styled.div`
	padding: ${({ theme }) => theme.gridUnit * 4}px;
`
