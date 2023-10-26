import { ReactQueryHydrate } from '@/components/ReactQueryHydrate'
import { Salaries } from '@/components/views/salaries/Salaries'
import { dehydrate } from '@tanstack/react-query'
import { getQueryClient } from '@/utils/getQueryClient'
import { getSalaries } from '@/api/queries/useSalariesQuery'

const Page = async () => {
	const queryClient = getQueryClient()
	await queryClient.prefetchQuery(['salaries'], getSalaries)
	const dehydratedState = dehydrate(queryClient)
	return (
		<ReactQueryHydrate state={dehydratedState}>
			<Salaries />
		</ReactQueryHydrate>
	)
}

export default Page
