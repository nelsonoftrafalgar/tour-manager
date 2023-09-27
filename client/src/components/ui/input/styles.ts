import { Label } from '@radix-ui/react-label'
import { TextFieldInput } from '@radix-ui/themes'
import styled from 'styled-components'

interface StyledInputProps {
	$error?: boolean
}

export const StyledInput = styled(TextFieldInput)<StyledInputProps>`
	border: 2px solid ${({ theme }) => theme.colors.border};
	padding: ${({ theme }) => theme.gridUnit * 2.5}px;
	border-radius: ${({ theme }) => theme.borderRadius}px;
	margin-top: ${({ theme }) => theme.gridUnit * 2.5}px;
	margin-bottom: ${({ theme, $error }) => (!$error ? theme.gridUnit * 5 : 0)}px;
	&::placeholder {
		color: ${({ theme }) => theme.colors.placeholder};
	}
	&:focus-visible {
		border: 2px solid
			${({ theme, $error }) =>
				$error
					? theme.colors.secondary.strawberry
					: theme.colors.primary.charchoal};
		outline: none;
	}
	border-color: ${({ theme, $error }) =>
		$error && theme.colors.secondary.strawberry};
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
