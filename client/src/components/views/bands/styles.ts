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

export const BandContentWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`
