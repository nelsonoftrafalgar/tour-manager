import {
	AccordionItem,
	AccordionRoot,
	StyledChevron,
	StyledContent,
	StyledContentText,
	StyledHeader,
	StyledTrigger,
} from './styles'
import { FC, ReactNode, Ref, forwardRef } from 'react'

import { AccoridionProps } from './types'

export const Accordion: FC<AccoridionProps> = ({ items }) => {
	return (
		<AccordionRoot type='single' collapsible>
			{items.map(({ id, content, header }) => (
				<AccordionItem key={id} value={id}>
					<AccordionTrigger>{header}</AccordionTrigger>
					<AccordionContent>{content}</AccordionContent>
				</AccordionItem>
			))}
		</AccordionRoot>
	)
}

const AccordionTrigger = forwardRef(
	(
		{ children, ...props }: { children: ReactNode },
		ref?: Ref<HTMLButtonElement>
	) => (
		<StyledHeader>
			<StyledTrigger {...props} ref={ref}>
				{children}
				<StyledChevron aria-hidden />
			</StyledTrigger>
		</StyledHeader>
	)
)

AccordionTrigger.displayName = 'AccordionTrigger'

const AccordionContent = forwardRef(
	(
		{ children, ...props }: { children: ReactNode },
		ref?: Ref<HTMLDivElement>
	) => (
		<StyledContent {...props} ref={ref}>
			<StyledContentText>{children}</StyledContentText>
		</StyledContent>
	)
)
AccordionContent.displayName = 'AccordionContent'
