import { media } from '@/styles/media'
import styled from 'styled-components'

export const CommentWrapper = styled.div`
	display: flex;
	order: 1;
	width: 100%;
	gap: 40px;
	flex-direction: column;
	align-items: stretch;

	${media.lg`
		width: 70%;
		flex-direction: row;
		align-items: center;
	`}
`
