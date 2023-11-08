'use client'

import { media } from '@/styles/media'
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

export const BandContentWrapper = styled.div`
	display: flex;
	align-items: stretch;
	flex-direction: column;
	justify-content: space-between;
	gap: ${({ theme }) => theme.gridUnit * 2}px;

	${media.sm`
		flex-direction: row;
		align-items: center;	
	`}
`
