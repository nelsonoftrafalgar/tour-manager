import styled from 'styled-components'

export const ReportDetailsList = styled.ul`
	display: flex;
	gap: 20px;
	list-style-type: none;
	width: 100%;
`

export const ReportDetailsItem = styled.li<{ $amount?: boolean }>`
	${({ theme, $amount }) => $amount && `color: ${theme.colors.primary.orange};`}
	width: 200px;
`
export const ReportContentWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	flex-wrap: wrap;
	row-gap: 20px;
	column-gap: 40px;
`
export const ReportComment = styled.p`
	border-radius: ${({ theme }) => theme.borderRadius}px;
	border: 1px solid ${({ theme }) => theme.colors.border};
	padding: ${({ theme }) => theme.gridUnit * 4}px;
	width: 100%;
`

export const List = styled.div`
	margin-top: ${({ theme }) => theme.gridUnit * 4}px;
`
