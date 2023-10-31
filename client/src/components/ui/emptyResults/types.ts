import { AccordionItem } from '../accordion/types'
import { PropsWithChildren } from 'react'

export interface EmptyResultsProps extends PropsWithChildren {
	entityType: string
	data?: AccordionItem[]
}
