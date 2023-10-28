import { useMutation, useQueryClient } from '@tanstack/react-query'

import client from '@/api/client'

interface SalaryUpdatePayload {
	id: string
	concertId: string
	amount: string
	comment: string
}

const editSalary = (data: SalaryUpdatePayload) => client.put('/salaries', data)

export const useSalaryEditMutation = (callback: () => void) => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: editSalary,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['salaries'] }), callback()
		},
	})
}
