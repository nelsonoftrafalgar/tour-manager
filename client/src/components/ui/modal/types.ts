import * as Dialog from '@radix-ui/react-dialog'

import { ReactNode } from 'react'

export interface ModalProps extends Dialog.DialogProps {
	title: string
	content: ReactNode
	modalStyle: 'primary' | 'secondary' | 'warning'
}
