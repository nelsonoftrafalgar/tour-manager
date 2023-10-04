import { useMutation, useQueryClient } from '@tanstack/react-query'

import client from '@/api/client'

interface BandCreatePayload {
	name: string
	frontMan: string
}

const createBand = (data: BandCreatePayload) => client.post('/bands', data)

export const useBandCreateMutation = (callback: () => void) => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: createBand,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['bands'] })
			callback()
		},
	})
}
