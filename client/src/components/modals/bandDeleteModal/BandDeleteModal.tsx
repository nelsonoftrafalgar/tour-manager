import { FC, useState } from 'react'

import { BandDelete } from '@/components/forms/bandDelete/BandDelete'
import { BandDeleteModalProps } from './types'
import { Modal } from '@/components/ui/modal/Modal'
import { useI18n } from '@/locales/client'

export const BandDeleteModal: FC<BandDeleteModalProps> = ({
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
			title={t('bands.delete_band')}
			content={<BandDelete {...props} handleModalClose={handleModalClose} />}
			modalStyle='warning'
		>
			{children}
		</Modal>
	)
}
