import { PlusCircledIcon } from '@radix-ui/react-icons'
import styled from 'styled-components'

export const Wrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, 180px);
	grid-gap: ${({ theme }) => theme.gridUnit * 4}px;
	justify-content: space-between;
`
export const CreateWrapper = styled.div`
	height: 100px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: ${({ theme }) => theme.borderRadius}px;
	cursor: pointer;
	&:hover {
		background-color: ${({ theme }) => theme.colors.primary.orange};
	}
`

export const AddNewTourManagerIcon = styled(PlusCircledIcon)`
	cursor: pointer;
	color: ${({ theme }) => theme.colors.primary.orange};
	${CreateWrapper}:hover & {
		color: ${({ theme }) => theme.colors.primary.white};
	}
`
