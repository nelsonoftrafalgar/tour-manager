import { Band } from '@/api/queries/useBandsQuery'
import { Concert } from '@/api/queries/useConcertsQuery'
import { GetSelectOptionsParams } from './types'
import { TourManager } from '@/api/queries/useTourManagerQuery'

const mapFiltereddDataToOptions = (
	filteredBands: Band[],
	filteredConcerts: Concert[],
	filteredTourManagers: TourManager[]
) => {
	return {
		bandOptions: filteredBands.map(({ name, id }) => ({
			label: name,
			value: id,
		})),
		concertOptions: filteredConcerts.map(({ place, id }) => ({
			label: place,
			value: id,
		})),
		tourManagerOptions: filteredTourManagers.map(({ name, id }) => ({
			label: name,
			value: id,
		})),
	}
}

export const getSelectOptions = ({
	concerts,
	concertId,
	bands,
	bandId,
	tourManagers,
	tourManagerId,
}: GetSelectOptionsParams) => {
	const selectedConcert = concerts.find(({ id }) => id === concertId)
	const filterConcerts = () => {
		if (bandId) {
			return concerts.filter(({ band }) => band.id === bandId)
		}

		if (tourManagerId) {
			return concerts.filter(({ tourManager }) => tourManager.id === tourManagerId)
		}

		return concerts
	}
	const filterBands = () => {
		if (concertId) {
			return bands.filter(({ id }) => id === selectedConcert?.band.id)
		}

		if (tourManagerId) {
			return bands.filter(({ id }) =>
				filterConcerts().some(({ band }) => band.id === id)
			)
		}

		return bands.filter(({ id }) => concerts.some(({ band }) => band.id === id))
	}

	const filterTourManagers = () => {
		if (concertId) {
			return tourManagers.filter(
				({ id }) => id === selectedConcert?.tourManager.id
			)
		}

		if (bandId) {
			return tourManagers.filter(({ id }) =>
				filterConcerts().some(({ tourManager }) => tourManager.id === id)
			)
		}

		return tourManagers.filter(({ id }) =>
			concerts.some(({ tourManager }) => tourManager.id === id)
		)
	}

	const filteredBands = filterBands()
	const filteredConcerts = filterConcerts()
	const filteredTourManagers = filterTourManagers()

	return mapFiltereddDataToOptions(
		filteredBands,
		filteredConcerts,
		filteredTourManagers
	)
}
