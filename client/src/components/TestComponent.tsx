'use client'

import client from '@/api/client'
import { useEffect } from 'react'

// import { useQuery } from '@tanstack/react-query'

// async function getUser() {
// 	const res = await fetch('https://jsonplaceholder.typicode.com/users')
// 	const users = await res.json()
// 	return users
// }

const testAxiosClient = async () => {
	const response = await client.get('/bands').catch(() => null)
	console.log(response)
}

export default function TestComponent() {
	// const { data, isLoading, isFetching, error } = useQuery({
	// 	queryKey: ['user'],
	// 	queryFn: getUser,
	// })
	// console.log('data: ', data)

	useEffect(() => {
		testAxiosClient()
	}, [])

	return <h1>HUI</h1>
}
