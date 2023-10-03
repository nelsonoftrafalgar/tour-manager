import { useMutation, useQueryClient } from '@tanstack/react-query'

import client from '@/api/client'

interface BandUpdatePayload {
	id: string
	name: string
	frontMan: string
}
const updateBand = (data: BandUpdatePayload) => client.put('/bands', data)

export const useBandMutation = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: updateBand,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['bands'] }),
	})
}
