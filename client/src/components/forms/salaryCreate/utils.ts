import { Concert } from '@/api/queries/useConcertsQuery'
import { format } from 'date-fns'

export const getConcertDetails = (concertId: string, data?: Concert[]) => {
	const selectedConcert = data?.find(({ id }) => id === concertId)
	const band = selectedConcert?.band
	const tourManager = selectedConcert?.tourManager
	const date = format(
		new Date(selectedConcert?.date ?? Date.now()),
		'dd/MM/yyyy'
	)

	return { band, date, tourManager }
}
