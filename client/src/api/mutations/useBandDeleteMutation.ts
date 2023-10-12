import { useMutation, useQueryClient } from '@tanstack/react-query'

import client from '@/api/client'

interface BandDeletePayload {
	id: string
}

const deleteBand = ({ id }: BandDeletePayload) => client.delete(`/bands/${id}`)

export const useBandDeleteMutation = (callback: () => void) => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: deleteBand,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['bands'] })
			callback()
		},
	})
}
