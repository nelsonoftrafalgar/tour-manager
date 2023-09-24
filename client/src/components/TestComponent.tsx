'use client'

import { useQuery } from '@tanstack/react-query'

async function getUser() {
	const res = await fetch('https://jsonplaceholder.typicode.com/users')
	const users = await res.json()
	return users
}

export default function TestComponent() {
	const { data, isLoading, isFetching, error } = useQuery({
		queryKey: ['user'],
		queryFn: getUser,
	})
	console.log('data: ', data)

	return <h1>HUI</h1>
}
