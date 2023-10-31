'use client'

import {
	CreateSalaryHeader,
	List,
	SalaryBoxWrapper,
	SalaryListHeader,
	SalaryListHeaderItem,
} from './styles'

import { Accordion } from '@/components/ui/accordion/Accordion'
import ApiLoader from '@/components/ui/loader/ApiLoader'
import { Box } from '@/components/ui/box/styles'
import { EmptyResults } from '@/components/ui/emptyResults/EmptyResults'
import { SalaryCreate } from '@/components/forms/salaryCreate/SalaryCreate'
import { useI18n } from '@/locales/client'
import { useSalaries } from './hooks'
import { useSalariesQuery } from '@/api/queries/useSalariesQuery'

export const Salaries = () => {
	const t = useI18n()
	const { data, isLoading } = useSalariesQuery()

	const { salaries } = useSalaries(data)

	return (
		<ApiLoader isLoading={isLoading}>
			<SalaryBoxWrapper>
				<Box>
					<CreateSalaryHeader>{t('salaries.create_new_salary')}</CreateSalaryHeader>
					<SalaryCreate />
				</Box>
				<Box>
					<SalaryListHeader>
						<SalaryListHeaderItem>{t('salaries.header.date')}</SalaryListHeaderItem>
						<SalaryListHeaderItem>
							{t('salaries.header.tourManager')}
						</SalaryListHeaderItem>
						<SalaryListHeaderItem>
							{t('salaries.header.concert')}
						</SalaryListHeaderItem>
						<SalaryListHeaderItem>{t('salaries.header.band')}</SalaryListHeaderItem>
						<SalaryListHeaderItem>{t('salaries.header.amount')}</SalaryListHeaderItem>
					</SalaryListHeader>
					<List data-testid='concerts-list'>
						<EmptyResults entityType='salaries' data={salaries}>
							<Accordion items={salaries} />
						</EmptyResults>
					</List>
				</Box>
			</SalaryBoxWrapper>
		</ApiLoader>
	)
}
