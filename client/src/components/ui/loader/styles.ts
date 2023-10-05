import Icon from '@/assets/loading.svg'
import styled from 'styled-components'

export const LoadingWrapper = styled.div`
	width: 100%;
	height: 200px;
	background-color: ${({ theme }) => theme.colors.primary.orange};
	display: flex;
	align-items: center;
	justify-content: center;
	opacity: 0.5;
`

export const LoaderIcon = styled(Icon)<{ $width?: number; $height?: number }>`
	width: ${({ $width }) => ($width ? $width : 20)}px;
	height: ${({ $height }) => ($height ? $height : 20)}px;
`
