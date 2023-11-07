'use client'

import { ReportCreateFormData, ReportCreateProps } from './types'

import { Button } from '@/components/ui/button/Button'
import { ButtonWrapper } from './styles'
import { FC } from 'react'
import { Form } from '@/components/ui/form/styles'
import { FormRangePicker } from '../formFields/FormRangePicker'
import { FormSelect } from '../formFields/FormSelect'
import { LoaderIcon } from '@/components/ui/loader/styles'
import { getReportSchema } from '../validation'
import { getSelectOptions } from './utils'
import { trimData } from '../utils'
import { useBandsQuery } from '@/api/queries/useBandsQuery'
import { useConcertsQuery } from '@/api/queries/useConcertsQuery'
import { useForm } from 'react-hook-form'
import { useI18n } from '@/locales/client'
import { useTourManagersQuery } from '@/api/queries/useTourManagerQuery'
import { yupResolver } from '@hookform/resolvers/yup'

export const ReportCreate: FC<ReportCreateProps> = ({ handleReportData }) => {
	const t = useI18n()

	const { data: tourManagers } = useTourManagersQuery()
	const { data: bands } = useBandsQuery()
	const { data: concerts } = useConcertsQuery()

	const {
		formState: { isSubmitting },
		control,
		handleSubmit,
		watch,
	} = useForm<ReportCreateFormData>({
		resolver: yupResolver(getReportSchema(t)),
	})

	const tourManagerId = watch('tourManagerId')
	const bandId = watch('bandId')
	const concertId = watch('concertId')

	if (!bands || !tourManagers || !concerts) return null

	const { bandOptions, concertOptions, tourManagerOptions } = getSelectOptions({
		concerts,
		concertId,
		bands,
		bandId,
		tourManagers,
		tourManagerId,
	})

	const onSubmit = (data: ReportCreateFormData) => {
		handleReportData(trimData(data))
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<FormRangePicker name='date' control={control} />
			<FormSelect
				name='tourManagerId'
				control={control}
				placeholder={t('concerts.select_tourManager_placeholder')}
				label={t('concerts.select_tourManager_label')}
				options={tourManagerOptions}
			/>
			<FormSelect
				name='bandId'
				control={control}
				placeholder={t('concerts.select_band_placeholder')}
				label={t('concerts.select_band_label')}
				options={bandOptions}
			/>
			<FormSelect
				name='concertId'
				control={control}
				placeholder={t('reports.select_concert_placeholder')}
				label={t('reports.select_concert_label')}
				options={concertOptions}
			/>
			<ButtonWrapper>
				<Button disabled={isSubmitting} buttonStyle='primary'>
					{isSubmitting && <LoaderIcon />}
					{t('reports.create_report')}
				</Button>
			</ButtonWrapper>
		</Form>
	)
}
