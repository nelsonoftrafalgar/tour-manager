import { ConcertEditFormData, ConcertEditProps } from './types'
import { FC, useEffect } from 'react'

import { Button } from '@/components/ui/button/Button'
import { ConcertEditWrapper } from './styles'
import { Form } from '@/components/ui/form/styles'
import { FormDatePicker } from '../formFields/FormDatePicker'
import { FormInput } from '../formFields/FormInput'
import { FormSelect } from '../formFields/FormSelect'
import { LoaderIcon } from '@/components/ui/loader/styles'
import { getConcertSchema } from '../validation'
import { trimData } from '../utils'
import { useBandsQuery } from '@/api/queries/useBandsQuery'
import { useConcertEditMutation } from '@/api/mutations/useConcertEditMutation'
import { useForm } from 'react-hook-form'
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
		formState: { isDirty, isSubmitting, isSubmitSuccessful },
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
				<FormInput
					placeholder={t('concerts.input_place_placeholder')}
					label={t('concerts.input_place_label')}
					name='place'
					control={control}
				/>
				<FormDatePicker name='date' control={control} />
				<FormSelect
					name='bandId'
					control={control}
					placeholder={t('concerts.select_band_placeholder')}
					label={t('concerts.select_band_label')}
					options={bands.map(({ name, id }) => ({ label: name, value: id }))}
				/>
				<FormSelect
					name='tourManagerId'
					control={control}
					placeholder={t('concerts.select_tourManager_placeholder')}
					label={t('concerts.select_tourManager_label')}
					options={tourManagers.map(({ name, id }) => ({
						label: name,
						value: id,
					}))}
				/>
				<Button disabled={!isDirty || isSubmitting} buttonStyle='primary'>
					{isSubmitting && <LoaderIcon />}
					{t('forms.save')}
				</Button>
			</Form>
		</ConcertEditWrapper>
	)
}
