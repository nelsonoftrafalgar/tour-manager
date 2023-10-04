'use client'

import * as Dialog from '@radix-ui/react-dialog'

import {
	DialogContent,
	DialogOverlay,
	DialogTitle,
	IconButton,
	ModalContent,
	ModalHeader,
} from './styled'
import { FC, PropsWithChildren } from 'react'

import { Cross2Icon } from '@radix-ui/react-icons'
import { ModalProps } from './types'

export const Modal: FC<PropsWithChildren<ModalProps>> = ({
	children,
	title,
	content,
	open,
	onOpenChange,
}) => {
	return (
		<Dialog.Root open={open} onOpenChange={onOpenChange}>
			<Dialog.Trigger asChild>{children}</Dialog.Trigger>
			<Dialog.Portal>
				<DialogOverlay />
				<DialogContent>
					<ModalHeader>
						<DialogTitle>{title}</DialogTitle>
					</ModalHeader>
					<ModalContent>{content}</ModalContent>
					<Dialog.Close asChild>
						<IconButton aria-label='Close'>
							<Cross2Icon />
						</IconButton>
					</Dialog.Close>
				</DialogContent>
			</Dialog.Portal>
		</Dialog.Root>
	)
}
