import { media } from '@/styles/media'
import Link from 'next/link'
import styled from 'styled-components'

export const Header = styled.header`
	height: 60px;
	align-items: center;
	gap: ${({ theme }) => theme.gridUnit * 7}px;
	margin-bottom: ${({ theme }) => theme.gridUnit * 5}px;
	display: none;
	${media.sm`
		display: flex;
	`}
`

export const MobileHeader = styled.header`
	height: 60px;
	align-items: center;
	justify-content: space-around;
	margin-bottom: ${({ theme }) => theme.gridUnit * 5}px;
	display: flex;
	${media.sm`
		display: none;
	`}
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

export const MobileStyledLink = styled(Link)<{ $active: boolean }>`
	text-decoration: none;
	color: ${({ theme, $active }) =>
		$active ? theme.colors.primary.white : theme.colors.primary.orange};
	background-color: ${({ theme, $active }) =>
		$active ? theme.colors.primary.orange : theme.colors.primary.white};
	border: 1px solid ${({ theme }) => theme.colors.primary.white};
	border-radius: 50%;
	width: 30px;
	height: 30px;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	&:before {
		content: '';
		width: 100%;
		height: 2px;
		background-color: ${({ theme }) => theme.colors.primary.white};
		display: ${({ $active }) => ($active ? 'block' : 'none')};
		position: absolute;
		bottom: -10px;
	}
`

export const Logo = styled.p`
	color: ${({ theme }) => theme.colors.primary.orange};
	font-size: 35px;
	-webkit-text-stroke-width: 0.5px;
	-webkit-text-stroke-color: ${({ theme }) => theme.colors.primary.black};
	font-weight: ${({ theme }) => theme.fonts.weight.bold};
`
