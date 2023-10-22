import { useMutation, useQueryClient } from '@tanstack/react-query'

import client from '@/api/client'

interface ConcertCreatePayload {
	place: string
	date: string
	bandId: string
	tourManagerId: string
}

const createConcert = (data: ConcertCreatePayload) =>
	client.post('/concerts', data)

export const useConcertCreateMutation = (callback: () => void) => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: createConcert,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['concerts'] })
			callback()
		},
	})
}
