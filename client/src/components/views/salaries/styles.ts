import { ellipsisMixin } from '@/styles/mixins'
import styled from 'styled-components'

export const SalaryListHeader = styled.ul`
	display: flex;
	list-style-type: none;
	gap: 20px;
	padding: ${({ theme }) => theme.gridUnit * 4}px;
	background-color: ${({ theme }) => theme.colors.secondary.mint};
	margin-top: ${({ theme }) => theme.gridUnit * 4}px;
	border-radius: ${({ theme }) => theme.borderRadius}px;
	flex-wrap: wrap;
`

export const SalaryBoxWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
`

export const CreateSalaryHeader = styled.h1`
	font-weight: ${({ theme }) => theme.fonts.weight.normal};
	font-size: ${({ theme }) => theme.fonts.size.l}px;
	margin-bottom: ${({ theme }) => theme.gridUnit * 6}px;
`

export const SalaryListHeaderItem = styled.li`
	width: 200px;
`

export const List = styled.div`
	margin-top: ${({ theme }) => theme.gridUnit * 4}px;
`
export const SalaryDetailsList = styled.ul`
	display: flex;
	gap: 20px;
	list-style-type: none;
	width: 100%;
	flex-wrap: wrap;
`

export const SalaryDetailsItem = styled.li<{ $amount?: boolean }>`
	${({ theme, $amount }) => $amount && `color: ${theme.colors.primary.orange};`}
	width: 200px;
	${ellipsisMixin}
`
export const SalaryContentWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	flex-wrap: wrap;
	row-gap: 20px;
	column-gap: 40px;
`
export const SalaryComment = styled.p`
	border-radius: ${({ theme }) => theme.borderRadius}px;
	border: 1px solid ${({ theme }) => theme.colors.border};
	padding: ${({ theme }) => theme.gridUnit * 4}px;
	width: 100%;
`
