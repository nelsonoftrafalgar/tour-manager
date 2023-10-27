'use client'

import styled from 'styled-components'

export const Box = styled.section`
	background-color: ${({ theme }) => theme.colors.primary.white};
	border-radius: ${({ theme }) => theme.borderRadius}px;
	width: 100%;
	padding: ${({ theme }) => theme.gridUnit * 4}px;
	box-shadow: ${({ theme }) => theme.boxShadow};
	margin-bottom: ${({ theme }) => theme.gridUnit * 2.5}px;
`
