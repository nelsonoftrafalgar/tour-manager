import client from '../client'
import { useQuery } from '@tanstack/react-query'

export interface Band {
	id: string
	name: string
	frontMan: string
	createdAt: Date
	updatedAt: Date
}

export const getBands = async () => {
	const { data } = await client.get<Band[]>('/bands')
	return data
}

export const useBandsQuery = () => {
	return useQuery({
		queryKey: ['bands'],
		queryFn: getBands,
	})
}
