'use client'

import * as Dialog from '@radix-ui/react-dialog'

import styled, { keyframes } from 'styled-components'

export const ModalContent = styled.div`
	padding: ${({ theme }) => theme.gridUnit * 4}px;
`

export const ModalHeader = styled.div<{ $style: string }>`
	padding: ${({ theme }) => theme.gridUnit * 4}px;

	background-color: ${({ theme, $style }) => {
		if ($style === 'primary') {
			return theme.colors.primary.orange
		}
		if ($style === 'secondary') {
			return theme.colors.secondary.mint
		}
		if ($style === 'warning') {
			return theme.colors.secondary.strawberry
		}
	}};
	border-top-right-radius: ${({ theme }) => theme.borderRadius}px;
	border-top-left-radius: ${({ theme }) => theme.borderRadius}px;
`

export const DialogTitle = styled(Dialog.Title)`
	color: ${({ theme }) => theme.colors.primary.white};
	font-size: ${({ theme }) => theme.fonts.size.xl}px;
`

export const overlayShow = keyframes`
0% {
  opacity: 0;
}
100% {
  opacity: .5;
}
`

export const DialogOverlay = styled(Dialog.Overlay)`
	background-color: ${({ theme }) => theme.colors.primary.black};
	position: fixed;
	inset: 0;
	opacity: 0.5;
	animation: ${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1);
`

export const contentShow = keyframes`
0% {
  opacity: 0;
  transform: translate(-50%, -48%) scale(0.96);
}
100% {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
}
`

export const DialogContent = styled(Dialog.Content)`
	background-color: ${({ theme }) => theme.colors.primary.white};
	border-radius: ${({ theme }) => theme.borderRadius}px;
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	animation: ${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1);

	&:focus {
		outline: none;
	}
`

export const IconButton = styled.button`
	border-radius: 100%;
	height: 25px;
	width: 25px;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	color: ${({ theme }) => theme.colors.primary.white};
	position: absolute;
	top: 10px;
	right: 10px;
	background-color: transparent;
	transition: background-color 0.2s, box-shadow 0.2s;
	cursor: pointer;

	&:hover {
		background-color: ${({ theme }) => theme.colors.primary.orange};
	}

	&:focus {
		box-shadow: ${({ theme }) => theme.boxShadow};
		outline: none;
	}
`
