import { BandCreateFormData } from './bandCreate/types'
import { BandEditFormData } from './bandEdit/types'
import { ConcertEditFormData } from './concertEdit/types'
import { ReportCreateFormData } from './createReport/types'
import { SalaryCreateFormData } from './salaryCreate/types'
import { TourManagerCreateFormData } from './tourManagerCreate/types'
import { TourManagerEditFormData } from './tourManagerEdit/types'

export const trimData = <
	T extends
		| BandCreateFormData
		| BandEditFormData
		| TourManagerEditFormData
		| TourManagerCreateFormData
		| ConcertEditFormData
		| ReportCreateFormData
		| SalaryCreateFormData
>(
	data: T
): T => {
	return Object.fromEntries(
		Object.entries(data).map(([key, value]) => [
			key,
			typeof value === 'string' ? value.trim() : value,
		])
	) as T
}
