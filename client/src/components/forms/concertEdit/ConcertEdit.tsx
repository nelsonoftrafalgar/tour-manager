import { ConcertEditFormData, ConcertEditProps } from './types'
import { Controller, useForm } from 'react-hook-form'
import { FC, useEffect } from 'react'

import { Button } from '@/components/ui/button/Button'
import { Form } from '@/components/ui/form/styles'
import { Input } from '@/components/ui/input/Input'
import { LoaderIcon } from '@/components/ui/loader/styles'
import { Select } from '@/components/ui/select/Select'
import { getConcertSchema } from '../validation'
import { useBandsQuery } from '@/api/queries/useBandsQuery'
import { useI18n } from '@/locales/client'
import { useTourManagersQuery } from '@/api/queries/useTourManagerQuery'
import { yupResolver } from '@hookform/resolvers/yup'

export const ConcertEdit: FC<ConcertEditProps> = ({
	place,
	band,
	tourManager,
	id,
}) => {
	const t = useI18n()
	const { data: bands } = useBandsQuery()
	const { data: tourManagers } = useTourManagersQuery()
	const {
		formState: { errors, isDirty, isSubmitting, isSubmitSuccessful },
		control,
		handleSubmit,
		reset,
	} = useForm<ConcertEditFormData>({
		resolver: yupResolver(getConcertSchema(t)),
		defaultValues: { place, band, tourManager },
	})
	useEffect(() => {
		if (isSubmitSuccessful) {
			reset({}, { keepValues: true })
		}
	}, [isSubmitSuccessful, reset])

	const onSubmit = (data: ConcertEditFormData) => {
		console.log({ ...data, id })
	}

	if (!bands || !tourManagers) return null

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<Controller
				name='place'
				control={control}
				rules={{ required: t('forms.required') }}
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
				name='band'
				control={control}
				rules={{ required: t('forms.required') }}
				render={({ field }) => (
					<Select
						{...field}
						placeholder={t('concerts.select_band_placeholder')}
						label={t('concerts.select_band_label')}
						options={bands.map(({ name }) => ({ label: name, value: name }))}
					/>
				)}
			/>
			<Controller
				name='tourManager'
				control={control}
				rules={{ required: t('forms.required') }}
				render={({ field }) => (
					<Select
						{...field}
						placeholder={t('concerts.select_tourManager_placeholder')}
						label={t('concerts.select_tourManager_label')}
						options={tourManagers.map(({ name }) => ({ label: name, value: name }))}
					/>
				)}
			/>
			<Button disabled={!isDirty || isSubmitting} buttonStyle='primary'>
				{isSubmitting && <LoaderIcon />}
				{t('forms.save')}
			</Button>
		</Form>
	)
}
