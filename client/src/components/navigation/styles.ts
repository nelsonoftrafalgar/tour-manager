import Link from 'next/link'
import styled from 'styled-components'

export const Header = styled.header`
	height: 60px;
	display: flex;
	align-items: center;
	gap: ${({ theme }) => theme.gridUnit * 5}px;
	margin-bottom: ${({ theme }) => theme.gridUnit * 5}px;
`

export const StyledLink = styled(Link)<{ $active: boolean }>`
	text-decoration: none;
	color: ${({ theme }) => theme.colors.primary.white};
	position: relative;
	&:before {
		content: '';
		width: 100%;
		height: 2px;
		background-color: ${({ theme }) => theme.colors.primary.orange};
		display: ${({ $active }) => ($active ? 'block' : 'none')};
		position: absolute;
		bottom: -5px;
	}
`
