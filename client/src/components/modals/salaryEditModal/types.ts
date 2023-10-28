import { PropsWithChildren } from 'react'

export interface SalaryEditModalProps extends PropsWithChildren {
	id: string
	concertId: string
	amount: string
	comment: string
}
