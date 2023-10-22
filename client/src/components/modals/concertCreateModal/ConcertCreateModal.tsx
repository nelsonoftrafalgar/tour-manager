import { FC, PropsWithChildren, useState } from 'react'

import { ConcertCreate } from '@/components/forms/concertCreate/ConcertCreate'
import { Modal } from '@/components/ui/modal/Modal'
import { useI18n } from '@/locales/client'

export const ConcertCreateModal: FC<PropsWithChildren> = ({ children }) => {
	const t = useI18n()
	const [open, setOpen] = useState(false)

	const handleModalClose = () => setOpen(false)

	return (
		<Modal
			open={open}
			onOpenChange={setOpen}
			title={t('concerts.add_new_concert')}
			content={<ConcertCreate handleModalClose={handleModalClose} />}
			modalStyle='primary'
		>
			{children}
		</Modal>
	)
}
