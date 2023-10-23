import { FC, useState } from 'react'

import { ConcertDelete } from '@/components/forms/concertDelete/ConcertDelete'
import { ConcertDeleteModalProps } from './types'
import { Modal } from '@/components/ui/modal/Modal'
import { useI18n } from '@/locales/client'

export const ConcertDeleteModal: FC<ConcertDeleteModalProps> = ({
	children,
	...props
}) => {
	const t = useI18n()
	const [open, setOpen] = useState(false)

	const handleModalClose = () => setOpen(false)

	return (
		<Modal
			open={open}
			onOpenChange={setOpen}
			title={t('concerts.delete_concert')}
			content={<ConcertDelete {...props} handleModalClose={handleModalClose} />}
			modalStyle='warning'
		>
			{children}
		</Modal>
	)
}
