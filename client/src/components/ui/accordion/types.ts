import { ReactNode } from 'react'

export interface AccordionItem {
	id: string
	header: ReactNode
	content: ReactNode
}

export interface AccoridionProps {
	items: AccordionItem[]
}
