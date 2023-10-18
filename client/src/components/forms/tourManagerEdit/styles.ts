import { CheckIcon } from '@radix-ui/react-icons'
import styled from 'styled-components'

export const EditWrapper = styled.div`
	width: 140px;
	position: absolute;
	left: 8px;
	top: 29px;
`

export const SaveIcon = styled(CheckIcon)`
	color: ${({ theme }) => theme.colors.secondary.mint};
	cursor: pointer;
	position: absolute;
	top: 50%;
	right: 8px;
	transform: translateY(-50%);
`
