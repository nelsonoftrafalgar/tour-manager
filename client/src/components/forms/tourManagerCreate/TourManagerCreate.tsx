import { Container, DeleteIcon, EditWrapper, SaveIcon } from './styles'
import { Controller, useForm } from 'react-hook-form'
import { TourManagerCreateFormState, TourManagerCreateProps } from './types'

import { FC } from 'react'
import { Input } from '@/components/ui/input/Input'
import { getTourManagerSchema } from '../validation'
import { useI18n } from '@/locales/client'
import { useTourManagerCreateMutation } from '@/api/mutations/useTourManagerCreateMutation'
import { yupResolver } from '@hookform/resolvers/yup'

export const TourManagerCreate: FC<TourManagerCreateProps> = ({
	handleCreateMode,
}) => {
	const t = useI18n()
	const mutation = useTourManagerCreateMutation(() => handleCreateMode(false))
	const {
		control,
		formState: { errors, isDirty, isSubmitting },
		handleSubmit,
	} = useForm<TourManagerCreateFormState>({
		resolver: yupResolver(getTourManagerSchema(t)),
		defaultValues: { name: '' },
	})

	const onSubmit = (data: TourManagerCreateFormState) => {
		mutation.mutate(data)
	}

	return (
		<Container>
			<EditWrapper>
				<Controller
					name='name'
					control={control}
					render={({ field }) => (
						<Input
							placeholder={t('tourManagers.input_name_placeholder')}
							{...field}
							ref={null}
							errorMessage={errors.name?.message}
						/>
					)}
				/>
			</EditWrapper>
			<DeleteIcon onClick={() => handleCreateMode(false)} />
			{isDirty && !isSubmitting && <SaveIcon onClick={handleSubmit(onSubmit)} />}
		</Container>
	)
}
