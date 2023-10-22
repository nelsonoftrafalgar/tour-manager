import client from '../client'
import { useQuery } from '@tanstack/react-query'

export interface Concert {
	id: string
	place: string
	date: string
	band: {
		name: string
		id: string
	}
	tourManager: {
		name: string
		id: string
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
