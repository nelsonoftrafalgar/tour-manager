'use client'

import 'react-toastify/dist/ReactToastify.css'

import { FC, ReactElement } from 'react'

import GlobalStyles from '@/styles/GlobalStyles'
import { I18nProviderClient } from '@/locales/client'
import ReactQueryProvider from './ReactQueryProvider'
import StyledComponentsRegistry from '@/styles/styledComponentsRegistry'
import { ThemeProvider } from 'styled-components'
import { ToastContainer } from 'react-toastify'
import { theme } from '@/styles/Theme'

interface ProvidersProps {
	locale: string
	children: ReactElement
}

const Providers: FC<ProvidersProps> = ({ locale, children }) => {
	return (
		<ReactQueryProvider>
			<I18nProviderClient locale={locale}>
				<StyledComponentsRegistry>
					<ThemeProvider theme={theme}>
						<GlobalStyles />
						<ToastContainer />
						{children}
					</ThemeProvider>
				</StyledComponentsRegistry>
			</I18nProviderClient>
		</ReactQueryProvider>
	)
}

export default Providers
