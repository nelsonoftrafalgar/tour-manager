import client from '../client'
import { useQuery } from '@tanstack/react-query'

export interface TourManager {
	id: string
	name: string
	createdAt: Date
	updatedAt: Date
}

export const getTourManagers = async () => {
	try {
		const response = await client.get<TourManager[]>('/tour_managers')
		return response.data
	} catch (error) {
		// TODO Error handling service
		return []
	}
}

export const useTourManagersQuery = () => {
	return useQuery({
		queryKey: ['tour_managers'],
		queryFn: getTourManagers,
	})
}
