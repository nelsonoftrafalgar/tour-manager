import { CheckIcon, TrashIcon } from '@radix-ui/react-icons'

import styled from 'styled-components'

export const Container = styled.div`
	border-radius: ${({ theme }) => theme.borderRadius}px;
	padding: ${({ theme }) => theme.gridUnit * 4}px;
	height: 100px;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: space-around;
	transition: background-color 0.3s;
	border: 1px solid ${({ theme }) => theme.colors.border};

	&:hover {
		background-color: ${({ theme }) => theme.colors.primary.lightGrey};
	}
`

export const SaveIcon = styled(CheckIcon)`
	color: ${({ theme }) => theme.colors.secondary.mint};
	cursor: pointer;
	position: absolute;
	top: 50%;
	right: 8px;
	transform: translateY(-50%);
	display: none;
	${Container}:hover & {
		display: block;
	}
`

export const EditWrapper = styled.div`
	width: 140px;
	position: absolute;
	left: 8px;
	top: 29px;
`

export const DeleteIcon = styled(TrashIcon)`
	color: ${({ theme }) => theme.colors.secondary.strawberry};
	position: absolute;
	cursor: pointer;
	top: 8px;
	right: 8px;
	display: none;
	${Container}:hover & {
		display: block;
	}
`
