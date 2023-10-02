'use client'

import { Header, List } from './styles'

import { Accordion } from '@/components/ui/accordion/Accordion'
import { Box } from '@/components/ui/box/styles'
import { Button } from '@/components/ui/button/Button'
import { Input } from '@/components/ui/input/Input'
import { useBandsQuery } from '@/api/queries/useBandsQuery'
import { useI18n } from '@/locales/client'

export const Bands = () => {
	const t = useI18n()
	const { data, isLoading } = useBandsQuery()

	if (isLoading || !data) return null

	const bands = data.map((band) => {
		return { id: band.id, header: band.name, content: band.frontMan }
	})

	return (
		<Box>
			<Header>
				<Input
					placeholder={t('bands.search_placeholder')}
					value=''
					onChange={() => {}}
				/>
				<Button buttonStyle='primary'>{t('bands.add_new_band')}</Button>
			</Header>
			<List>
				<Accordion items={bands} />
			</List>
		</Box>
	)
}
