import { BandEditFormData, BandEditProps } from './types'
import { Controller, useForm } from 'react-hook-form'
import { FC, useEffect } from 'react'

import { BandDeleteModal } from '@/components/modals/bandDeleteModal/BandDeleteModal'
import { Button } from '@/components/ui/button/Button'
import { DeleteWrapper } from './styles'
import { Form } from '@/components/ui/form/styles'
import { Input } from '@/components/ui/input/Input'
import { LoaderIcon } from '@/components/ui/loader/styles'
import { useBandEditMutation } from '@/api/mutations/useBandEditMutation'
import { useI18n } from '@/locales/client'

export const BandEdit: FC<BandEditProps> = ({ name, frontMan, id }) => {
	const t = useI18n()
	const mutation = useBandEditMutation()
	const {
		formState: { errors, isDirty, isSubmitting, isSubmitSuccessful },
		control,
		handleSubmit,
		reset,
	} = useForm<BandEditFormData>({
		defaultValues: { name, frontMan },
	})
	useEffect(() => {
		if (isSubmitSuccessful) {
			reset({}, { keepValues: true })
		}
	}, [isSubmitSuccessful, reset])

	const onSubmit = (data: BandEditFormData) => {
		mutation.mutate({ id, ...data })
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
			<Button disabled={!isDirty || isSubmitting} buttonStyle='primary'>
				{isSubmitting && <LoaderIcon />}
				{t('forms.save')}
			</Button>
			<DeleteWrapper>
				<BandDeleteModal id={id} name={name}>
					<Button type='button' buttonStyle='warning'>
						{t('forms.delete')}
					</Button>
				</BandDeleteModal>
			</DeleteWrapper>
		</Form>
	)
}
