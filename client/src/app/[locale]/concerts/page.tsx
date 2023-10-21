import { Concerts } from '@/components/views/concerts/Concerts'
import { ReactQueryHydrate } from '@/components/ReactQueryHydrate'
import { dehydrate } from '@tanstack/react-query'
import { getConcerts } from '@/api/queries/useConcertsQuery'
import { getQueryClient } from '@/utils/getQueryClient'

const Page = async () => {
	const queryClient = getQueryClient()
	await queryClient.prefetchQuery(['concerts'], getConcerts)
	const dehydratedState = dehydrate(queryClient)
	return (
		<ReactQueryHydrate state={dehydratedState}>
			<Concerts />
		</ReactQueryHydrate>
	)
}

export default Page
