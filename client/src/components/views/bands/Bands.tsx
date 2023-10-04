'use client'

import { Header, List } from './styles'

import { Accordion } from '@/components/ui/accordion/Accordion'
import { BandCreateModal } from '@/components/modals/bandCreateModal/BandCreateModal'
import { BandEdit } from '@/components/forms/bandEdit/BandEdit'
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
		const { id, name } = band
		return {
			id,
			header: name,
			content: <BandEdit {...band} />,
		}
	})

	return (
		<Box>
			<Header>
				<Input
					placeholder={t('bands.search_placeholder')}
					value=''
					onChange={() => {}}
				/>
				<BandCreateModal>
					<Button buttonStyle='primary'>{t('bands.add_new_band')}</Button>
				</BandCreateModal>
			</Header>
			<List>
				<Accordion items={bands} />
			</List>
		</Box>
	)
}
