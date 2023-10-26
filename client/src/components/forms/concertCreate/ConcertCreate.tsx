import { ConcertCreateFormData, ConcertCreateProps } from './types'
import { Controller, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button/Button'
import { DatePicker } from '@/components/ui/datePicker/DatePicker'
import { FC } from 'react'
import { Form } from '@/components/ui/form/styles'
import { Input } from '@/components/ui/input/Input'
import { LoaderIcon } from '@/components/ui/loader/styles'
import { Select } from '@/components/ui/select/Select'
import { getConcertSchema } from '../validation'
import { trimData } from '../utils'
import { useBandsQuery } from '@/api/queries/useBandsQuery'
import { useConcertCreateMutation } from '@/api/mutations/useConcertCreateMutation'
import { useI18n } from '@/locales/client'
import { useTourManagersQuery } from '@/api/queries/useTourManagerQuery'
import { yupResolver } from '@hookform/resolvers/yup'

export const ConcertCreate: FC<ConcertCreateProps> = ({ handleModalClose }) => {
	const t = useI18n()
	const { data: bands } = useBandsQuery()
	const { data: tourManagers } = useTourManagersQuery()
	const mutation = useConcertCreateMutation(handleModalClose)
	const {
		formState: { errors, isSubmitting },
		control,
		handleSubmit,
	} = useForm<ConcertCreateFormData>({
		resolver: yupResolver(getConcertSchema(t)),
	})

	const onSubmit = async (data: ConcertCreateFormData) => {
		mutation.mutate(trimData(data))
	}

	if (!bands || !tourManagers) return null

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<Controller
				name='place'
				control={control}
				render={({ field }) => (
					<Input
						placeholder={t('concerts.input_place_placeholder')}
						label={t('concerts.input_place_label')}
						{...field}
						ref={null}
						errorMessage={errors.place?.message}
					/>
				)}
			/>
			<Controller
				name='date'
				control={control}
				render={({ field }) => (
					<DatePicker {...field} errorMessage={errors.date?.message} />
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
						options={bands.map(({ name, id }) => ({ label: name, value: id }))}
						errorMessage={errors.bandId?.message}
					/>
				)}
			/>
			<Controller
				name='tourManagerId'
				control={control}
				render={({ field }) => (
					<Select
						{...field}
						placeholder={t('concerts.select_tourManager_placeholder')}
						label={t('concerts.select_tourManager_label')}
						options={tourManagers.map(({ name, id }) => ({
							label: name,
							value: id,
						}))}
						errorMessage={errors.tourManagerId?.message}
					/>
				)}
			/>
			<Button disabled={isSubmitting} buttonStyle='primary'>
				{isSubmitting && <LoaderIcon />}
				{t('forms.add')}
			</Button>
		</Form>
	)
}
