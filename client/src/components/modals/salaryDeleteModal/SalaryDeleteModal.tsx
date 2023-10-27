import { FC, useState } from 'react'

import { Modal } from '@/components/ui/modal/Modal'
import { SalaryDelete } from '@/components/forms/salaryDelete/SalaryDelete'
import { SalaryDeleteModalProps } from './types'
import { useI18n } from '@/locales/client'

export const SalaryDeleteModal: FC<SalaryDeleteModalProps> = ({
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
			title={t('salaries.delete_salary')}
			content={<SalaryDelete {...props} handleModalClose={handleModalClose} />}
			modalStyle='warning'
		>
			{children}
		</Modal>
	)
}
