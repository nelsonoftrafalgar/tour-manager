import { useMutation, useQueryClient } from '@tanstack/react-query'

import client from '@/api/client'

interface BandUpdatePayload {
	id: string
	name: string
	frontMan: string
}

const editBand = (data: BandUpdatePayload) => client.put('/bands', data)

export const useBandEditMutation = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: editBand,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['bands'] }),
	})
}
