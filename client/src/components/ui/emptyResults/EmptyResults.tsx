import React, { FC } from 'react'

import { EmptyResultsProps } from './types'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import { Wrapper } from './styles'
import { useI18n } from '@/locales/client'

export const EmptyResults: FC<EmptyResultsProps> = ({
	entityType,
	children,
	data,
}) => {
	const t = useI18n()

	const noData = data?.length === 0

	if (noData) {
		return (
			<Wrapper>
				<ExclamationTriangleIcon width={40} height={40} />
				<p>{t('ui.empty_state', { type: entityType })}</p>
			</Wrapper>
		)
	}

	return <>{children}</>
}
