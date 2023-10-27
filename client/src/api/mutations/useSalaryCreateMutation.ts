import { useMutation, useQueryClient } from '@tanstack/react-query'

import client from '@/api/client'

interface SalaryCreatePayload {
	amount: string
	comment: string
	bandId: string
	concertId: string
	tourManagerId: string
}

const createSalary = (data: SalaryCreatePayload) =>
	client.post('/salaries', data)

export const useSalaryCreateMutation = (callback: () => void) => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: createSalary,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['salaries'] })
			callback()
		},
	})
}
