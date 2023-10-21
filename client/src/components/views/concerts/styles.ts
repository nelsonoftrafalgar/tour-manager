'use client'

import styled from 'styled-components'

export const Header = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
`
export const List = styled.div`
	margin-top: ${({ theme }) => theme.gridUnit * 4}px;
`

export const ConcertContentWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`

export const ConcertListHeader = styled.ul`
	display: flex;
	list-style-type: none;
	gap: 100px;
	padding: ${({ theme }) => theme.gridUnit * 4}px;
	background-color: ${({ theme }) => theme.colors.secondary.mint};
	margin-top: ${({ theme }) => theme.gridUnit * 4}px;
	border-radius: ${({ theme }) => theme.borderRadius}px;
`

export const ConcertListHeaderItem = styled.li`
	width: 200px;
`

export const ConcertDetailsList = styled.ul`
	display: flex;
	gap: 100px;
	list-style-type: none;
`

export const ConcertDetailsItem = styled.li`
	width: 200px;
`
