import {
	SalaryComment,
	SalaryContentWrapper,
	SalaryDetailsItem,
	SalaryDetailsList,
} from './styles'

import { Salary } from '@/api/queries/useSalariesQuery'
import { format } from 'date-fns'

export const useSalaries = (data?: Salary[]) => {
	const salaries =
		data?.map(
			({
				id,
				concert: { date, place },
				band: { name: band },
				tourManager: { name: tourManager },
				amount,
				comment,
			}) => {
				const concertDate = format(new Date(date), 'dd-MM-yyy')
				return {
					id,
					header: (
						<SalaryDetailsList>
							<SalaryDetailsItem>{concertDate}</SalaryDetailsItem>
							<SalaryDetailsItem>{tourManager}</SalaryDetailsItem>
							<SalaryDetailsItem>{place}</SalaryDetailsItem>
							<SalaryDetailsItem>{band}</SalaryDetailsItem>
							<SalaryDetailsItem $amount>
								{amount.replace('$', '$ ')}
							</SalaryDetailsItem>
						</SalaryDetailsList>
					),
					content: (
						<SalaryContentWrapper>
							<SalaryComment>{comment}</SalaryComment>
						</SalaryContentWrapper>
					),
				}
			}
		) ?? []

	return { salaries }
}
