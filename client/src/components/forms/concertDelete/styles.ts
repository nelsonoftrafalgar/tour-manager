import { media } from '@/styles/media'
import styled from 'styled-components'

export const DeleteButtonsWrapper = styled.div`
	display: flex;
	margin-top: ${({ theme }) => theme.gridUnit * 5}px;
	justify-content: space-between;

	${media.sm`
		gap: 40px;
	`}
`
