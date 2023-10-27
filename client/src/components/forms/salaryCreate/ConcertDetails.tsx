import {
	ConcertDetailsData,
	ConcertDetailsLabel,
	ConcertDetailsWrapper,
} from './styles'

import { ConcertDetailsProps } from './types'
import { FC } from 'react'
import { getConcertDetails } from './utils'
import { useConcertsQuery } from '@/api/queries/useConcertsQuery'
import { useI18n } from '@/locales/client'

export const ConcertDetails: FC<ConcertDetailsProps> = ({ concertId }) => {
	const t = useI18n()

	const { data } = useConcertsQuery()
	const { band, date, tourManager } = getConcertDetails(concertId, data)
	return (
		<ConcertDetailsWrapper>
			<div>
				<ConcertDetailsLabel>
					{t('salaries.concert_details_band')}
				</ConcertDetailsLabel>
				<ConcertDetailsData>{band?.name}</ConcertDetailsData>
			</div>
			<div>
				<ConcertDetailsLabel>
					{t('salaries.concert_details_tourManager')}
				</ConcertDetailsLabel>
				<ConcertDetailsData>{tourManager?.name}</ConcertDetailsData>
			</div>
			<div>
				<ConcertDetailsLabel>
					{t('salaries.concert_details_date')}
				</ConcertDetailsLabel>
				<ConcertDetailsData>{date}</ConcertDetailsData>
			</div>
		</ConcertDetailsWrapper>
	)
}
