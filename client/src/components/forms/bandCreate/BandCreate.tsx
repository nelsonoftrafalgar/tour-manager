import { BandCreateFormData, BandCreateProps } from './types'
import { Controller, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button/Button'
import { FC } from 'react'
import { Form } from '@/components/ui/form/styles'
import { Input } from '@/components/ui/input/Input'
import { LoaderIcon } from '@/components/ui/loader/styles'
import { getBandSchema } from '../validation'
import { useBandCreateMutation } from '@/api/mutations/useBandCreateMutation'
import { useI18n } from '@/locales/client'
import { yupResolver } from '@hookform/resolvers/yup'

export const BandCreate: FC<BandCreateProps> = ({ handleModalClose }) => {
	const t = useI18n()
	const mutation = useBandCreateMutation(handleModalClose)
	const {
		formState: { errors, isSubmitting },
		control,
		handleSubmit,
	} = useForm<BandCreateFormData>({
		resolver: yupResolver(getBandSchema(t)),
	})

	const onSubmit = async (data: BandCreateFormData) => {
		mutation.mutate(data)
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
			<Button disabled={isSubmitting} buttonStyle='primary'>
				{isSubmitting && <LoaderIcon />}
				{t('forms.add')}
			</Button>
		</Form>
	)
}
