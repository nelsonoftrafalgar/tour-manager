import { ChangeEvent, useState } from 'react'

import { AccordionItem } from '@/components/ui/accordion/types'
import { Band } from '@/api/queries/useBandsQuery'
import { BandContentWrapper } from './styles'
import { BandDeleteModal } from '@/components/modals/bandDeleteModal/BandDeleteModal'
import { BandEdit } from '@/components/forms/bandEdit/BandEdit'
import { Button } from '@/components/ui/button/Button'
import { useI18n } from '@/locales/client'

export const useBandSearch = (data?: Band[]) => {
	const t = useI18n()
	const [search, setSearch] = useState('')
	const bands =
		data?.reduce((acc: AccordionItem[], band) => {
			const { id, name } = band

			if (name.toLowerCase().includes(search.toLowerCase())) {
				return [
					...acc,
					{
						id,
						header: name,
						content: (
							<BandContentWrapper>
								<BandEdit {...band} />
								<BandDeleteModal id={id} name={name}>
									<Button type='button' buttonStyle='warning'>
										{t('forms.delete')}
									</Button>
								</BandDeleteModal>
							</BandContentWrapper>
						),
					},
				]
			}
			return acc
		}, []) ?? []

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) =>
		setSearch(e.currentTarget.value)

	return { bands, search, handleSearch }
}
