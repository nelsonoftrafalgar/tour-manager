import { BandCreateFormData, BandCreateProps } from './types'
import { Controller, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button/Button'
import { FC } from 'react'
import { Form } from '@/components/ui/form/styles'
import { Input } from '@/components/ui/input/Input'
import { useBandCreateMutation } from '@/api/mutations/useBandCreateMutation'
import { useI18n } from '@/locales/client'

export const BandCreate: FC<BandCreateProps> = ({ handleModalClose }) => {
	const t = useI18n()
	const mutation = useBandCreateMutation(handleModalClose)
	const {
		formState: { errors },
		control,
		handleSubmit,
	} = useForm<BandCreateFormData>()

	const onSubmit = async (data: BandCreateFormData) => {
		mutation.mutate(data)
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<Controller
				name='name'
				control={control}
				rules={{ required: t('forms.required') }}
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
				rules={{ required: t('forms.required') }}
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
			<Button buttonStyle='primary'>{t('forms.add')}</Button>
		</Form>
	)
}
