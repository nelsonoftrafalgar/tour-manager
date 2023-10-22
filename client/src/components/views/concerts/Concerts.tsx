'use client'

import {
	ConcertListHeader,
	ConcertListHeaderItem,
	Header,
	List,
} from './styles'

import { Accordion } from '@/components/ui/accordion/Accordion'
import ApiLoader from '@/components/ui/loader/ApiLoader'
import { Box } from '@/components/ui/box/styles'
import { Button } from '@/components/ui/button/Button'
import { ConcertCreateModal } from '@/components/modals/concertCreateModal/ConcertCreateModal'
import { Input } from '@/components/ui/input/Input'
import { useConcertSearch } from './hooks'
import { useConcertsQuery } from '@/api/queries/useConcertsQuery'
import { useI18n } from '@/locales/client'

export const Concerts = () => {
	const t = useI18n()
	const { data, isLoading } = useConcertsQuery()

	const { concerts, search, handleSearch } = useConcertSearch(data)

	return (
		<ApiLoader isLoading={isLoading}>
			<Box>
				<Header>
					<Input
						placeholder={t('concerts.search_placeholder')}
						value={search}
						onChange={handleSearch}
					/>
					<ConcertCreateModal>
						<Button buttonStyle='primary'>{t('concerts.add_new_concert')}</Button>
					</ConcertCreateModal>
				</Header>
				<ConcertListHeader>
					<ConcertListHeaderItem>{t('concerts.header.place')}</ConcertListHeaderItem>
					<ConcertListHeaderItem>{t('concerts.header.date')}</ConcertListHeaderItem>
					<ConcertListHeaderItem>{t('concerts.header.band')}</ConcertListHeaderItem>
					<ConcertListHeaderItem>
						{t('concerts.header.tourManager')}
					</ConcertListHeaderItem>
				</ConcertListHeader>
				<List data-testid='concerts-list'>
					<Accordion items={concerts} />
				</List>
			</Box>
		</ApiLoader>
	)
}
