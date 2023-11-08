'use client'

import { media } from '@/styles/media'
import styled from 'styled-components'

export const Form = styled.form`
	display: flex;
	align-items: stretch;
	column-gap: 40px;
	flex-wrap: wrap;
	flex-direction: column;
	${media.sm`
		align-items: center;
		flex-direction: row;
	`}
`
