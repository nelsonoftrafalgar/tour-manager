import { FC, PropsWithChildren, useState } from 'react'

import { BandCreate } from '@/components/forms/bandCreate/BandCreate'
import { Modal } from '@/components/ui/modal/Modal'
import { useI18n } from '@/locales/client'

export const BandCreateModal: FC<PropsWithChildren> = ({ children }) => {
	const t = useI18n()
	const [open, setOpen] = useState(false)

	const handleModalClose = () => setOpen(false)

	return (
		<Modal
			open={open}
			onOpenChange={setOpen}
			title={t('bands.add_new_band')}
			content={<BandCreate handleModalClose={handleModalClose} />}
		>
			{children}
		</Modal>
	)
}
