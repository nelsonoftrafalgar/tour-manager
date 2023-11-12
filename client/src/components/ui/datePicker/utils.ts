import { format } from 'date-fns'

export const formatDate = (date: Date) =>
	date ? format(date, 'yyyy-MM-dd') : ''
