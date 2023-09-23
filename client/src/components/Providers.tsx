'use client'

import { FC, PropsWithChildren } from 'react'

import GlobalStyles from '@/styles/GlobalStyles'
import { I18nProviderClient } from '@/locales/client'
import StyledComponentsRegistry from '@/styles/styledComponentsRegistry'
import { ThemeProvider } from 'styled-components'
import { theme } from '@/styles/Theme'

const Providers: FC<PropsWithChildren> = ({ children }) => {
	return (
		<I18nProviderClient>
			<StyledComponentsRegistry>
				<GlobalStyles />
				<ThemeProvider theme={theme}>{children}</ThemeProvider>
			</StyledComponentsRegistry>
		</I18nProviderClient>
	)
}

export default Providers
