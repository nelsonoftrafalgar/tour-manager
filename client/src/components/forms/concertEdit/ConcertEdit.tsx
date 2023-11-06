import { ConcertEditFormData, ConcertEditProps } from './types'
import { Controller, useForm } from 'react-hook-form'
import { FC, useEffect } from 'react'

import { Button } from '@/components/ui/button/Button'
import { ConcertEditWrapper } from './styles'
import { DatePicker } from '@/components/ui/datePicker/DatePicker'
import { Form } from '@/components/ui/form/styles'
import { Input } from '@/components/ui/input/Input'
import { LoaderIcon } from '@/components/ui/loader/styles'
import { Select } from '@/components/ui/select/Select'
import { getConcertSchema } from '../validation'
import { trimData } from '../utils'
import { useBandsQuery } from '@/api/queries/useBandsQuery'
import { useConcertEditMutation } from '@/api/mutations/useConcertEditMutation'
import { useI18n } from '@/locales/client'
import { useTourManagersQuery } from '@/api/queries/useTourManagerQuery'
import { yupResolver } from '@hookform/resolvers/yup'

export const ConcertEdit: FC<ConcertEditProps> = ({
	place,
	bandId,
	tourManagerId,
	id,
	date,
}) => {
	const t = useI18n()
	const { data: bands } = useBandsQuery()
	const { data: tourManagers } = useTourManagersQuery()
	const mutation = useConcertEditMutation()
	const {
		formState: { errors, isDirty, isSubmitting, isSubmitSuccessful },
		control,
		handleSubmit,
		reset,
	} = useForm<ConcertEditFormData>({
		resolver: yupResolver(getConcertSchema(t)),
		defaultValues: { place, bandId, tourManagerId, date },
	})
	useEffect(() => {
		if (isSubmitSuccessful) {
			reset({}, { keepValues: true })
		}
	}, [isSubmitSuccessful, reset])

	const onSubmit = (data: ConcertEditFormData) => {
		mutation.mutate(trimData({ ...data, id }))
	}

	if (!bands || !tourManagers) return null

	return (
		<ConcertEditWrapper>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<Controller
					name='place'
					control={control}
					render={({ field: { value, onChange } }) => (
						<Input
							placeholder={t('concerts.input_place_placeholder')}
							label={t('concerts.input_place_label')}
							value={value}
							onChange={onChange}
							errorMessage={errors.place?.message}
						/>
					)}
				/>
				<Controller
					name='date'
					control={control}
					render={({ field: { value, onChange } }) => (
						<DatePicker
							value={value}
							onChange={onChange}
							errorMessage={errors.date?.message}
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
							options={bands.map(({ name, id }) => ({ label: name, value: id }))}
						/>
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
							options={tourManagers.map(({ name, id }) => ({
								label: name,
								value: id,
							}))}
						/>
					)}
				/>
				<Button disabled={!isDirty || isSubmitting} buttonStyle='primary'>
					{isSubmitting && <LoaderIcon />}
					{t('forms.save')}
				</Button>
			</Form>
		</ConcertEditWrapper>
	)
}
