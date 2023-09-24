'use client'

import { Hydrate, HydrateProps } from '@tanstack/react-query'

export const ReactQueryHydrate = (props: HydrateProps) => {
	return <Hydrate {...props} />
}
