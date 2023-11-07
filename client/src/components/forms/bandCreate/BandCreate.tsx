import { BandCreateFormData, BandCreateProps } from './types'

import { Button } from '@/components/ui/button/Button'
import { FC } from 'react'
import { Form } from '@/components/ui/form/styles'
import { FormInput } from '../formFields/FormInput'
import { LoaderIcon } from '@/components/ui/loader/styles'
import { getBandSchema } from '../validation'
import { trimData } from '../utils'
import { useBandCreateMutation } from '@/api/mutations/useBandCreateMutation'
import { useForm } from 'react-hook-form'
import { useI18n } from '@/locales/client'
import { yupResolver } from '@hookform/resolvers/yup'

export const BandCreate: FC<BandCreateProps> = ({ handleModalClose }) => {
	const t = useI18n()
	const mutation = useBandCreateMutation(handleModalClose)
	const {
		formState: { isSubmitting },
		control,
		handleSubmit,
	} = useForm<BandCreateFormData>({
		resolver: yupResolver(getBandSchema(t)),
	})

	const onSubmit = async (data: BandCreateFormData) => {
		mutation.mutate(trimData(data))
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

			<Button disabled={isSubmitting} buttonStyle='primary'>
				{isSubmitting && <LoaderIcon />}
				{t('forms.add')}
			</Button>
		</Form>
	)
}
