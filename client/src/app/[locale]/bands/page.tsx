import { Bands } from '@/components/views/bands/Bands'
import { ReactQueryHydrate } from '@/components/ReactQueryHydrate'
import { dehydrate } from '@tanstack/react-query'
import { getBands } from '@/api/queries/useBandsQuery'
import { getQueryClient } from '@/utils/getQueryClient'

const Page = async () => {
	const queryClient = getQueryClient()
	await queryClient.prefetchQuery(['bands'], getBands)
	const dehydratedState = dehydrate(queryClient)
	return (
		<ReactQueryHydrate state={dehydratedState}>
			<Bands />
		</ReactQueryHydrate>
	)
}

export default Page
