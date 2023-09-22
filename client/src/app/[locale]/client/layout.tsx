'use client'

import { I18nProviderClient } from '@/locales/client'
import { PropsWithChildren } from 'react'

export default function Layout({ children }: PropsWithChildren) {
	return <I18nProviderClient>{children}</I18nProviderClient>
}
