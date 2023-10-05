'use client'

import { ChangeEvent, useState } from 'react'
import { Header, List } from './styles'

import { Accordion } from '@/components/ui/accordion/Accordion'
import { AccordionItem } from '@/components/ui/accordion/types'
import ApiLoader from '@/components/ui/loader/ApiLoader'
import { BandCreateModal } from '@/components/modals/bandCreateModal/BandCreateModal'
import { BandEdit } from '@/components/forms/bandEdit/BandEdit'
import { Box } from '@/components/ui/box/styles'
import { Button } from '@/components/ui/button/Button'
import { Input } from '@/components/ui/input/Input'
import { useBandSearch } from './hooks'
import { useBandsQuery } from '@/api/queries/useBandsQuery'
import { useI18n } from '@/locales/client'

export const Bands = () => {
	const t = useI18n()
	const { data, isLoading } = useBandsQuery()
	const { bands, search, handleSearch } = useBandSearch(data)

	return (
		<ApiLoader isLoading={isLoading}>
			<Box>
				<Header>
					<Input
						placeholder={t('bands.search_placeholder')}
						value={search}
						onChange={handleSearch}
					/>
					<BandCreateModal>
						<Button buttonStyle='primary'>{t('bands.add_new_band')}</Button>
					</BandCreateModal>
				</Header>
				<List>
					<Accordion items={bands} />
				</List>
			</Box>
		</ApiLoader>
	)
}
