import { ReactQueryHydrate } from '@/components/ReactQueryHydrate'
import TourManagers from '@/components/views/tourManagers/TourManagers'
import { dehydrate } from '@tanstack/react-query'
import { getQueryClient } from '@/utils/getQueryClient'
import { getTourManagers } from '@/api/queries/useTourManagerQuery'

const Page = async () => {
	const queryClient = getQueryClient()
	await queryClient.prefetchQuery(['tour_managers'], getTourManagers)
	const dehydratedState = dehydrate(queryClient)
	return (
		<ReactQueryHydrate state={dehydratedState}>
			<TourManagers />
		</ReactQueryHydrate>
	)
}

export default Page
