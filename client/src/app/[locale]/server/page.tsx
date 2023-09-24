import { ReactQueryHydrate } from '@/components/ReactQueryHydrate'
import TestComponent from '@/components/TestComponent'
import { dehydrate } from '@tanstack/react-query'
import { getQueryClient } from '@/utils/getQueryClient'

async function getUser() {
	const res = await fetch('https://jsonplaceholder.typicode.com/users')
	const users = await res.json()
	return users
}

export default async function Server() {
	const queryClient = getQueryClient()
	await queryClient.prefetchQuery(['user'], getUser)
	const dehydratedState = dehydrate(queryClient)

	return (
		<ReactQueryHydrate state={dehydratedState}>
			<div>
				<TestComponent />
			</div>
		</ReactQueryHydrate>
	)
}
