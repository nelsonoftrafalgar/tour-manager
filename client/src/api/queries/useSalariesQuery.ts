import client from '../client'
import { useQuery } from '@tanstack/react-query'

export interface Salary {
	id: string
	amount: string
	comment: string
	band: {
		name: string
	}
	tourManager: {
		name: string
	}
	concert: {
		place: string
		date: string
		id: string
	}
}

export const getSalaries = async () => {
	const { data } = await client.get<Salary[]>('/salaries')
	return data
}

export const useSalariesQuery = () => {
	return useQuery({
		queryKey: ['salaries'],
		queryFn: getSalaries,
	})
}
