import { useMutation, useQueryClient } from '@tanstack/react-query'

import client from '@/api/client'

interface EditTourManagerPayload {
	id: string
	name: string
}

const editTourManager = (data: EditTourManagerPayload) =>
	client.put(`/tour_managers`, data)

export const useTourManagerEditMutation = (callback: () => void) => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: editTourManager,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['tour_managers'] })
			callback()
		},
	})
}
