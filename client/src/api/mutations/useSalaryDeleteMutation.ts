import { useMutation, useQueryClient } from '@tanstack/react-query'

import client from '@/api/client'

interface SalaryDeletePayload {
	id: string
}

const deleteSalary = ({ id }: SalaryDeletePayload) =>
	client.delete(`/salaries/${id}`)

export const useSalaryDeleteMutation = (callback: () => void) => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: deleteSalary,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['salaries'] })
			callback()
		},
	})
}
