import * as Component from '@radix-ui/react-tooltip'

import { FC, PropsWithChildren } from 'react'
import { TooltipArrow, TooltipContent } from './styles'

export interface TooltipDemoProps extends PropsWithChildren {
	title: string
}

export const Tooltip: FC<TooltipDemoProps> = ({ children, title }) => {
	return (
		<Component.Provider>
			<Component.Root>
				<Component.Trigger asChild>{children}</Component.Trigger>
				<Component.Portal>
					<TooltipContent sideOffset={3}>
						{title}
						<TooltipArrow />
					</TooltipContent>
				</Component.Portal>
			</Component.Root>
		</Component.Provider>
	)
}
