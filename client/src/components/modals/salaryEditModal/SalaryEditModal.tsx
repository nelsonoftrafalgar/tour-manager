import { FC, useState } from 'react'

import { Modal } from '@/components/ui/modal/Modal'
import { SalaryEdit } from '@/components/forms/salaryEdit/SalaryEdit'
import { SalaryEditModalProps } from './types'
import { useI18n } from '@/locales/client'

export const SalaryEditModal: FC<SalaryEditModalProps> = ({
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
			title={t('salaries.edit_salary')}
			content={<SalaryEdit handleModalClose={handleModalClose} {...props} />}
			modalStyle='secondary'
		>
			{children}
		</Modal>
	)
}
