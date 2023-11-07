import { BandEditFormData, BandEditProps } from './types'
import { FC, useEffect } from 'react'

import { Button } from '@/components/ui/button/Button'
import { Form } from '@/components/ui/form/styles'
import { FormInput } from '../formFields/FormInput'
import { LoaderIcon } from '@/components/ui/loader/styles'
import { getBandSchema } from '../validation'
import { trimData } from '../utils'
import { useBandEditMutation } from '@/api/mutations/useBandEditMutation'
import { useForm } from 'react-hook-form'
import { useI18n } from '@/locales/client'
import { yupResolver } from '@hookform/resolvers/yup'

export const BandEdit: FC<BandEditProps> = ({ name, frontMan, id }) => {
	const t = useI18n()
	const mutation = useBandEditMutation()
	const {
		formState: { isDirty, isSubmitting, isSubmitSuccessful },
		control,
		handleSubmit,
		reset,
	} = useForm<BandEditFormData>({
		resolver: yupResolver(getBandSchema(t)),
		defaultValues: { name, frontMan },
	})
	useEffect(() => {
		if (isSubmitSuccessful) {
			reset({}, { keepValues: true })
		}
	}, [isSubmitSuccessful, reset])

	const onSubmit = (data: BandEditFormData) => {
		mutation.mutate(trimData({ id, ...data }))
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<FormInput
				placeholder={t('bands.input_name_placeholder')}
				label={t('bands.input_name_label')}
				name='name'
				control={control}
			/>
			<FormInput
				placeholder={t('bands.input_frontMan_placeholder')}
				label={t('bands.input_frontMan_label')}
				name='frontMan'
				control={control}
			/>
			<Button disabled={!isDirty || isSubmitting} buttonStyle='primary'>
				{isSubmitting && <LoaderIcon />}
				{t('forms.save')}
			</Button>
		</Form>
	)
}
