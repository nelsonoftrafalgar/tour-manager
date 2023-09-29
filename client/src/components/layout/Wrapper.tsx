'use client'

import { PropsWithChildren } from 'react'
import { StyledWrapper } from './styles'

const Wrapper = ({ children }: PropsWithChildren) => {
	return <StyledWrapper>{children}</StyledWrapper>
}

export default Wrapper
