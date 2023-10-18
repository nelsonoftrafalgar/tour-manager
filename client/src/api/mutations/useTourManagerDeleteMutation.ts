import { useMutation, useQueryClient } from '@tanstack/react-query'

import client from '@/api/client'

const deleteTourManager = (id: string) => client.delete(`/tour_managers/${id}`)

export const useTourManagerDeleteMutation = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: deleteTourManager,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['tour_managers'] })
		},
	})
}
