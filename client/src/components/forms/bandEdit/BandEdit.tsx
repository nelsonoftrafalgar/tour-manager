import { BandEditFormData, BandEditProps } from './types'
import { Controller, useForm } from 'react-hook-form'
import { FC, useEffect } from 'react'

import { Button } from '@/components/ui/button/Button'
import { Form } from '@/components/ui/form/styles'
import { Input } from '@/components/ui/input/Input'
import { LoaderIcon } from '@/components/ui/loader/styles'
import { getBandSchema } from '../validation'
import { trimData } from '../utils'
import { useBandEditMutation } from '@/api/mutations/useBandEditMutation'
import { useI18n } from '@/locales/client'
import { yupResolver } from '@hookform/resolvers/yup'

export const BandEdit: FC<BandEditProps> = ({ name, frontMan, id }) => {
	const t = useI18n()
	const mutation = useBandEditMutation()
	const {
		formState: { errors, isDirty, isSubmitting, isSubmitSuccessful },
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
			<Controller
				name='name'
				control={control}
				render={({ field }) => (
					<Input
						placeholder={t('bands.input_name_placeholder')}
						label={t('bands.input_name_label')}
						{...field}
						ref={null}
						errorMessage={errors.name?.message}
					/>
				)}
			/>
			<Controller
				name='frontMan'
				control={control}
				render={({ field }) => (
					<Input
						placeholder={t('bands.input_frontMan_placeholder')}
						label={t('bands.input_frontMan_label')}
						{...field}
						ref={null}
						errorMessage={errors.frontMan?.message}
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
