import styled from 'styled-components'

export const DeleteButtonsWrapper = styled.div`
	display: flex;
	gap: ${({ theme }) => theme.gridUnit * 10}px;
	margin-top: ${({ theme }) => theme.gridUnit * 5}px;
	justify-content: space-between;
`
