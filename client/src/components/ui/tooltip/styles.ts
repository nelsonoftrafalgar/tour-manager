import * as Tooltip from '@radix-ui/react-tooltip'

import styled, { keyframes } from 'styled-components'

const slideUpAndFade = keyframes`
  0% { opacity: 0; transform: translateY(2px); }
  100% { opacity: 1; transform: translateY(0); }
`

const slideRightAndFade = keyframes`
  0% { opacity: 0; transform: translateX(-2px); }
  100% { opacity: 1; transform: translateX(0); }
`

const slideDownAndFade = keyframes`
  0% { opacity: 0; transform: translateY(-2px); }
  100% { opacity: 1; transform: translateY(0); }
`

const slideLeftAndFade = keyframes`
  0% { opacity: 0; transform: translateX(2px); }
  100% { opacity: 1; transform: translateX(0); }
`

export const TooltipContent = styled(Tooltip.Content)`
	border-radius: ${({ theme }) => theme.borderRadius}px;
	padding: ${({ theme }) => theme.gridUnit * 2}px;
	font-size: ${({ theme }) => theme.fonts.size.xs}px;
	background-color: ${({ theme }) => theme.colors.primary.white};
	box-shadow: ${({ theme }) => theme.boxShadow};
	user-select: none;
	animation-duration: 400ms;
	animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
	will-change: transform, opacity;

	&[data-state='delayed-open'] {
		&[data-side='top'] {
			animation-name: ${slideDownAndFade};
		}
		&[data-side='right'] {
			animation-name: ${slideLeftAndFade};
		}
		&[data-side='bottom'] {
			animation-name: ${slideUpAndFade};
		}
		&[data-side='left'] {
			animation-name: ${slideRightAndFade};
		}
	}
`

export const TooltipArrow = styled(Tooltip.Arrow)`
	fill: ${({ theme }) => theme.colors.primary.white};
`
