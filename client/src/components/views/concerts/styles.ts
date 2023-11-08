'use client'

import { media } from '@/styles/media'
import { ellipsisMixin } from '@/styles/mixins'
import styled from 'styled-components'

export const Header = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: stretch;
	width: 100%;
	flex-direction: column;

	${media.sm`
		flex-direction: row;
		align-items: center;	
	`}
`
export const List = styled.div`
	margin-top: ${({ theme }) => theme.gridUnit * 4}px;
`

export const ConcertContentWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: stretch;
	width: 100%;
	flex-direction: column;
	gap: 10px;

	${media.sm`
		flex-direction: row;
		align-items: center;	
	`}
`

export const ConcertListHeader = styled.ul`
	display: flex;
	list-style-type: none;
	gap: 20px 50px;
	flex-wrap: wrap;
	padding: ${({ theme }) => theme.gridUnit * 4}px;
	background-color: ${({ theme }) => theme.colors.secondary.mint};
	margin-top: ${({ theme }) => theme.gridUnit * 4}px;
	border-radius: ${({ theme }) => theme.borderRadius}px;
	padding-right: 31px;
`

export const ConcertListHeaderItem = styled.li`
	width: 200px;
`

export const ConcertDetailsList = styled.ul`
	display: flex;
	gap: 20px 50px;
	list-style-type: none;
	width: calc(100% - 15px);
	flex-wrap: wrap;
`

export const ConcertDetailsItem = styled.li`
	width: 200px;
	${ellipsisMixin}
`
