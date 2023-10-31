'use client'

import { Controller, useForm } from 'react-hook-form'
import { CreateReportProps, ReportCreateFormData } from './types'

import { Button } from '@/components/ui/button/Button'
import { ButtonWrapper } from './styles'
import { FC } from 'react'
import { Form } from '@/components/ui/form/styles'
import { LoaderIcon } from '@/components/ui/loader/styles'
import { RangePicker } from '@/components/ui/datePicker/RangePicker'
import { Select } from '@/components/ui/select/Select'
import { getReportSchema } from '../validation'
import { trimData } from '../utils'
import { useBandsQuery } from '@/api/queries/useBandsQuery'
import { useConcertsQuery } from '@/api/queries/useConcertsQuery'
import { useI18n } from '@/locales/client'
import { useTourManagersQuery } from '@/api/queries/useTourManagerQuery'
import { yupResolver } from '@hookform/resolvers/yup'

export const CreateReport: FC<CreateReportProps> = ({ handleReportData }) => {
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

	const selectedConcert = concerts.find(({ id }) => id === concertId)

	const filteredConcerts = () => {
		if (bandId) {
			return concerts.filter(({ band }) => band.id === bandId)
		}

		if (tourManagerId) {
			return concerts.filter(({ tourManager }) => tourManager.id === tourManagerId)
		}

		return concerts
	}

	const filteredBands = () => {
		if (concertId) {
			return bands.filter(({ id }) => id === selectedConcert?.band.id)
		}

		if (tourManagerId) {
			return bands.filter(({ id }) =>
				filteredConcerts().some(({ band }) => band.id === id)
			)
		}

		return bands
	}

	const filteredTourManagers = () => {
		if (concertId) {
			return tourManagers.filter(
				({ id }) => id === selectedConcert?.tourManager.id
			)
		}

		if (bandId) {
			return tourManagers.filter(({ id }) =>
				filteredConcerts().some(({ tourManager }) => tourManager.id === id)
			)
		}

		return tourManagers
	}

	const onSubmit = (data: ReportCreateFormData) => {
		handleReportData(trimData(data))
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<Controller
				name='date'
				control={control}
				render={({ field }) => <RangePicker {...field} />}
			/>
			<Controller
				name='tourManagerId'
				control={control}
				render={({ field }) => (
					<Select
						{...field}
						placeholder={t('concerts.select_tourManager_placeholder')}
						label={t('concerts.select_tourManager_label')}
						options={filteredTourManagers().map(({ name, id }) => ({
							label: name,
							value: id,
						}))}
						errorMessage={errors.tourManagerId?.message}
					/>
				)}
			/>
			<Controller
				name='bandId'
				control={control}
				render={({ field }) => (
					<Select
						{...field}
						placeholder={t('concerts.select_band_placeholder')}
						label={t('concerts.select_band_label')}
						options={filteredBands().map(({ name, id }) => ({
							label: name,
							value: id,
						}))}
						errorMessage={errors.bandId?.message}
					/>
				)}
			/>
			<Controller
				name='concertId'
				control={control}
				render={({ field }) => (
					<Select
						{...field}
						placeholder={t('reports.select_concert_placeholder')}
						label={t('reports.select_concert_label')}
						options={filteredConcerts().map(({ place, id }) => ({
							label: place,
							value: id,
						}))}
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
