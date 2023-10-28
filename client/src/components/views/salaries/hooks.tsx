import {
	SalaryComment,
	SalaryContentWrapper,
	SalaryDetailsItem,
	SalaryDetailsList,
} from './styles'

import { Button } from '@/components/ui/button/Button'
import { Salary } from '@/api/queries/useSalariesQuery'
import { SalaryDeleteModal } from '@/components/modals/salaryDeleteModal/SalaryDeleteModal'
import { SalaryEditModal } from '@/components/modals/salaryEditModal/SalaryEditModal'
import { format } from 'date-fns'
import { useI18n } from '@/locales/client'

export const useSalaries = (data?: Salary[]) => {
	const t = useI18n()

	const salaries =
		data?.map(
			({
				id,
				concert: { date, place, id: concertId },
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
						<>
							<SalaryContentWrapper>
								<SalaryComment>{comment}</SalaryComment>
								<SalaryEditModal
									id={id}
									comment={comment}
									amount={amount}
									concertId={concertId}
								>
									<Button type='button' buttonStyle='secondary'>
										{t('forms.edit')}
									</Button>
								</SalaryEditModal>
								<SalaryDeleteModal place={place} id={id}>
									<Button type='button' buttonStyle='warning'>
										{t('forms.delete')}
									</Button>
								</SalaryDeleteModal>
							</SalaryContentWrapper>
						</>
					),
				}
			}
		) ?? []

	return { salaries }
}
