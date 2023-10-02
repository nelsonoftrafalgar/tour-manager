import client from '../client'
import { useQuery } from '@tanstack/react-query'

interface Band {
	id: string
	name: string
	frontMan: string
	createdAt: Date
	updatedAt: Date
}

export const getBands = async () => {
	try {
		const response = await client.get<Band[]>('/bands')
		return response.data
	} catch (error) {
		// TODO Error handling service
		return []
	}
}

export const useBandsQuery = () => {
	return useQuery({
		queryKey: ['bands'],
		queryFn: getBands,
	})
}
