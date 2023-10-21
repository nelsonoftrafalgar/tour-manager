import client from '../client'
import { useQuery } from '@tanstack/react-query'

export interface Concert {
	id: string
	place: string
	date: string
	band: {
		name: string
	}
	tourManager: {
		name: string
	}
}

export const getConcerts = async () => {
	const { data } = await client.get<Concert[]>('/concerts')
	return data
}

export const useConcertsQuery = () => {
	return useQuery({
		queryKey: ['concerts'],
		queryFn: getConcerts,
	})
}
