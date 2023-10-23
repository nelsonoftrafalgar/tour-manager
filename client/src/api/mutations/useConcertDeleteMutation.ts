import { useMutation, useQueryClient } from '@tanstack/react-query'

import client from '@/api/client'

interface ConcertDeletePayload {
	id: string
}

const deleteConcert = ({ id }: ConcertDeletePayload) =>
	client.delete(`/concerts/${id}`)

export const useConcertDeleteMutation = (callback: () => void) => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: deleteConcert,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['concerts'] })
			callback()
		},
	})
}
