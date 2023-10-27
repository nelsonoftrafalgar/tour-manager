import styled from 'styled-components'

export const CommentWrapper = styled.div`
	display: flex;
	align-items: center;
	order: 1;
	width: 70%;
	gap: 40px;
`

export const ConcertDetailsWrapper = styled.div`
	padding: ${({ theme }) => theme.gridUnit * 4}px;
	background-color: ${({ theme }) => theme.colors.secondary.mint};
	border-radius: ${({ theme }) => theme.borderRadius}px;
	display: flex;
	gap: 40px;
`

export const ConcertDetailsLabel = styled.p`
	font-size: ${({ theme }) => theme.fonts.size.xs}px;
	margin-bottom: ${({ theme }) => theme.gridUnit * 2.5}px;
`

export const ConcertDetailsData = styled.p`
	font-size: ${({ theme }) => theme.fonts.size.s}px;
`
