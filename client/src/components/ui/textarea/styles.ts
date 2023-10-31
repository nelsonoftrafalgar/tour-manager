'use client'

import styled, { css } from 'styled-components'

import { Label } from '@radix-ui/react-label'
import { TextArea } from '@radix-ui/themes'

interface StyledTextareaProps {
	$error?: boolean
}

export const TextAreaWrapper = styled.div`
	flex: 1;
	position: relative;
`

export const StyledTextarea = styled(TextArea)<StyledTextareaProps>`
	textarea {
		border: 2px solid ${({ theme }) => theme.colors.border};
		padding: ${({ theme }) => theme.gridUnit * 2.5}px;
		border-radius: ${({ theme }) => theme.borderRadius}px;
		margin-top: ${({ theme }) => theme.gridUnit * 2.5}px;
		margin-bottom: ${({ theme, $error }) => (!$error ? theme.gridUnit * 5 : 0)}px;
		resize: none;
		width: 100%;
		font-size: ${({ theme }) => theme.fonts.size.xs}px;
		&::placeholder {
			color: ${({ theme }) => theme.colors.placeholder};
			font-size: ${({ theme }) => theme.fonts.size.xs}px;
		}
		&:focus-visible {
			border: 2px solid
				${({ theme, $error }) =>
					$error
						? theme.colors.secondary.strawberry
						: theme.colors.primary.charchoal};
			outline: none;
		}
		${({ theme, $error }) =>
			$error &&
			css`
				border-color: ${theme.colors.secondary.strawberry};
			`}
	}
`

export const StyledLabel = styled(Label)`
	color: ${({ theme }) => theme.colors.primary.charchoal};
	font-size: ${({ theme }) => theme.fonts.size.xs}px;
	font-weight: ${({ theme }) => theme.fonts.weight.bold};
`

export const ErrorMessage = styled.span`
	color: ${({ theme }) => theme.colors.secondary.strawberry};
	font-size: ${({ theme }) => theme.fonts.size.xs}px;
	margin-left: ${({ theme }) => theme.gridUnit * 3}px;
	display: inline-block;
	margin-top: ${({ theme }) => theme.gridUnit * 2.5}px;
`

export const CharCounter = styled.span`
	color: ${({ theme }) => theme.colors.border};
	font-size: ${({ theme }) => theme.fonts.size.xxs}px;
	position: absolute;
	top: 85px;
	left: 12px;
`
