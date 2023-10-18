import { useMutation, useQueryClient } from '@tanstack/react-query'

import client from '@/api/client'

interface TourManagerCreatePayload {
	name: string
}

const createTourManager = (data: TourManagerCreatePayload) =>
	client.post('/tour_managers', data)

export const useTourManagerCreateMutation = (callback: () => void) => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: createTourManager,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['tour_managers'] })
			callback()
		},
	})
}
