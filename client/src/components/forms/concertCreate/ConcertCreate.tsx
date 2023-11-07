import { ConcertCreateFormData, ConcertCreateProps } from './types'

import { Button } from '@/components/ui/button/Button'
import { FC } from 'react'
import { Form } from '@/components/ui/form/styles'
import { FormDatePicker } from '../formFields/FormDatePicker'
import { FormInput } from '../formFields/FormInput'
import { FormSelect } from '../formFields/FormSelect'
import { LoaderIcon } from '@/components/ui/loader/styles'
import { getConcertSchema } from '../validation'
import { trimData } from '../utils'
import { useBandsQuery } from '@/api/queries/useBandsQuery'
import { useConcertCreateMutation } from '@/api/mutations/useConcertCreateMutation'
import { useForm } from 'react-hook-form'
import { useI18n } from '@/locales/client'
import { useTourManagersQuery } from '@/api/queries/useTourManagerQuery'
import { yupResolver } from '@hookform/resolvers/yup'

export const ConcertCreate: FC<ConcertCreateProps> = ({ handleModalClose }) => {
	const t = useI18n()
	const { data: bands } = useBandsQuery()
	const { data: tourManagers } = useTourManagersQuery()
	const mutation = useConcertCreateMutation(handleModalClose)
	const {
		formState: { isSubmitting },
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
			<Button disabled={isSubmitting} buttonStyle='primary'>
				{isSubmitting && <LoaderIcon />}
				{t('forms.add')}
			</Button>
		</Form>
	)
}
