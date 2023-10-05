import { LoaderIcon, LoadingWrapper } from './styles'
import React, { FC, PropsWithChildren } from 'react'

import { ApiLoaderProps } from './types'
import { Box } from '@/components/ui/box/styles'

const ApiLoader: FC<PropsWithChildren<ApiLoaderProps>> = ({
	isLoading,
	children,
}) => {
	if (!isLoading) {
		return <>{children}</>
	}

	return (
		<Box>
			<LoadingWrapper>
				<LoaderIcon $width={100} $height={100} />
			</LoadingWrapper>
		</Box>
	)
}

export default ApiLoader
