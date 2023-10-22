import { useMutation, useQueryClient } from '@tanstack/react-query'

import client from '@/api/client'

interface ConcertUpdatePayload {
	id: string
	place: string
	date: string
	bandId: string
	tourManagerId: string
}

const editConcert = (data: ConcertUpdatePayload) =>
	client.put('/concerts', data)

export const useConcertEditMutation = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: editConcert,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['concerts'] }),
	})
}
