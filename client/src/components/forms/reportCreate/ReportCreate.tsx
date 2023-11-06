'use client'

import { Controller, useForm } from 'react-hook-form'
import { ReportCreateFormData, ReportCreateProps } from './types'

import { Button } from '@/components/ui/button/Button'
import { ButtonWrapper } from './styles'
import { FC } from 'react'
import { Form } from '@/components/ui/form/styles'
import { LoaderIcon } from '@/components/ui/loader/styles'
import { RangePicker } from '@/components/ui/datePicker/RangePicker'
import { Select } from '@/components/ui/select/Select'
import { getReportSchema } from '../validation'
import { getSelectOptions } from './utils'
import { trimData } from '../utils'
import { useBandsQuery } from '@/api/queries/useBandsQuery'
import { useConcertsQuery } from '@/api/queries/useConcertsQuery'
import { useI18n } from '@/locales/client'
import { useTourManagersQuery } from '@/api/queries/useTourManagerQuery'
import { yupResolver } from '@hookform/resolvers/yup'

export const ReportCreate: FC<ReportCreateProps> = ({ handleReportData }) => {
	const t = useI18n()

	const { data: tourManagers } = useTourManagersQuery()
	const { data: bands } = useBandsQuery()
	const { data: concerts } = useConcertsQuery()

	const {
		formState: { errors, isSubmitting },
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
			<Controller
				name='date'
				control={control}
				render={({ field: { value, onChange } }) => (
					<RangePicker value={value} onChange={onChange} />
				)}
			/>
			<Controller
				name='tourManagerId'
				control={control}
				render={({ field: { value, onChange } }) => (
					<Select
						value={value}
						onChange={onChange}
						placeholder={t('concerts.select_tourManager_placeholder')}
						label={t('concerts.select_tourManager_label')}
						options={tourManagerOptions}
						errorMessage={errors.tourManagerId?.message}
					/>
				)}
			/>
			<Controller
				name='bandId'
				control={control}
				render={({ field: { value, onChange } }) => (
					<Select
						value={value}
						onChange={onChange}
						placeholder={t('concerts.select_band_placeholder')}
						label={t('concerts.select_band_label')}
						options={bandOptions}
						errorMessage={errors.bandId?.message}
					/>
				)}
			/>
			<Controller
				name='concertId'
				control={control}
				render={({ field: { value, onChange } }) => (
					<Select
						value={value}
						onChange={onChange}
						placeholder={t('reports.select_concert_placeholder')}
						label={t('reports.select_concert_label')}
						options={concertOptions}
						errorMessage={errors.bandId?.message}
					/>
				)}
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
