import { ChangeEvent, useState } from 'react'
import {
	ConcertContentWrapper,
	ConcertDetailsItem,
	ConcertDetailsList,
} from './styles'

import { AccordionItem } from '@/components/ui/accordion/types'
import { Button } from '@/components/ui/button/Button'
import { Concert } from '@/api/queries/useConcertsQuery'
import { ConcertDeleteModal } from '@/components/modals/concertDeleteModal/ConcertDeleteModal'
import { ConcertEdit } from '@/components/forms/concertEdit/ConcertEdit'
import { Tooltip } from '@/components/ui/tooltip/Tooltip'
import { format } from 'date-fns'
import { useI18n } from '@/locales/client'

export const useConcertSearch = (data?: Concert[]) => {
	const t = useI18n()
	const [search, setSearch] = useState('')
	const concerts =
		data?.reduce((acc: AccordionItem[], concert) => {
			const {
				id,
				place,
				date,
				band: { id: bandId, name: band },
				tourManager: { id: tourManagerId, name: tourManager },
			} = concert
			const concertDate = format(new Date(date), 'dd-MM-yyy')

			if (place.toLowerCase().includes(search.toLowerCase())) {
				return [
					...acc,
					{
						id,
						header: (
							<ConcertDetailsList>
								<Tooltip title={place}>
									<ConcertDetailsItem>{place}</ConcertDetailsItem>
								</Tooltip>
								<Tooltip title={concertDate}>
									<ConcertDetailsItem>{concertDate}</ConcertDetailsItem>
								</Tooltip>
								<Tooltip title={band}>
									<ConcertDetailsItem>{band}</ConcertDetailsItem>
								</Tooltip>
								<Tooltip title={tourManager}>
									<ConcertDetailsItem>{tourManager}</ConcertDetailsItem>
								</Tooltip>
							</ConcertDetailsList>
						),
						content: (
							<ConcertContentWrapper>
								<ConcertEdit
									{...concert}
									bandId={bandId}
									tourManagerId={tourManagerId}
								/>
								<ConcertDeleteModal id={id}>
									<Button type='button' buttonStyle='warning'>
										{t('forms.delete')}
									</Button>
								</ConcertDeleteModal>
							</ConcertContentWrapper>
						),
					},
				]
			}
			return acc
		}, []) ?? []

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) =>
		setSearch(e.currentTarget.value)

	return { concerts, search, handleSearch }
}
