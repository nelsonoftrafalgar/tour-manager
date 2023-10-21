import { ChangeEvent, useState } from 'react'
import {
	ConcertContentWrapper,
	ConcertDetailsItem,
	ConcertDetailsList,
} from './styles'

import { AccordionItem } from '@/components/ui/accordion/types'
import { Button } from '@/components/ui/button/Button'
import { Concert } from '@/api/queries/useConcertsQuery'
import { ConcertEdit } from '@/components/forms/concertEdit/ConcertEdit'
import { useI18n } from '@/locales/client'

export const useConcertSearch = (data?: Concert[]) => {
	const t = useI18n()
	const [search, setSearch] = useState('')
	const concerts =
		data?.reduce((acc: AccordionItem[], concert) => {
			const {
				id,
				place,
				band: { name: band },
				tourManager: { name: tourManager },
			} = concert

			if (place.toLowerCase().includes(search.toLowerCase())) {
				return [
					...acc,
					{
						id,
						header: (
							<ConcertDetailsList>
								<ConcertDetailsItem>{place}</ConcertDetailsItem>
								<ConcertDetailsItem>{band}</ConcertDetailsItem>
								<ConcertDetailsItem>{tourManager}</ConcertDetailsItem>
							</ConcertDetailsList>
						),
						content: (
							<ConcertContentWrapper>
								<ConcertEdit {...concert} band={band} tourManager={tourManager} />
								<Button type='button' buttonStyle='warning'>
									{t('forms.delete')}
								</Button>
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
