import { ChangeEvent, useState } from 'react'

import { AccordionItem } from '@/components/ui/accordion/types'
import { Band } from '@/api/queries/useBandsQuery'
import { BandEdit } from '@/components/forms/bandEdit/BandEdit'

export const useBandSearch = (data?: Band[]) => {
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
						content: <BandEdit {...band} />,
					},
				]
			}
			return acc
		}, []) ?? []

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) =>
		setSearch(e.currentTarget.value)

	return { bands, search, handleSearch }
}
