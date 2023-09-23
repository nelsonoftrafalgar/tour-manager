'use client'

import { PropsWithChildren, useState } from 'react'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'

import { useServerInsertedHTML } from 'next/navigation'

export default function StyledComponentsRegistry({
	children,
}: PropsWithChildren) {
	const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet())

	useServerInsertedHTML(() => {
		const styles = styledComponentsStyleSheet.getStyleElement()
		styledComponentsStyleSheet.instance.clearTag()
		return <>{styles}</>
	})

	if (typeof window !== 'undefined') return <>{children}</>

	return (
		<StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
			{children}
		</StyleSheetManager>
	)
}
