'use client'

import { Header, StyledLink } from './styles'

import { ROUTES } from './routes'
import React from 'react'
import { useI18n } from '@/locales/client'
import { usePathname } from 'next/navigation'

const Navigation = () => {
	const pathName = usePathname()
	const t = useI18n()

	return (
		<Header>
			<StyledLink $active={pathName === ROUTES.bands} href={ROUTES.bands}>
				{t('routes.bands')}
			</StyledLink>
			<StyledLink
				$active={pathName === ROUTES.tourManagers}
				href={ROUTES.tourManagers}
			>
				{t('routes.tour_managers')}
			</StyledLink>
			<StyledLink $active={pathName === ROUTES.concerts} href={ROUTES.concerts}>
				{t('routes.concerts')}
			</StyledLink>
		</Header>
	)
}

export default Navigation
