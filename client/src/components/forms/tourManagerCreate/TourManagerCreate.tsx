import { Container, DeleteIcon, EditWrapper, SaveIcon } from './styles'
import { Controller, useForm } from 'react-hook-form'
import { TourManagerCreateFormData, TourManagerCreateProps } from './types'

import { FC } from 'react'
import { Input } from '@/components/ui/input/Input'
import { getTourManagerSchema } from '../validation'
import { trimData } from '../utils'
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
	} = useForm<TourManagerCreateFormData>({
		resolver: yupResolver(getTourManagerSchema(t)),
		defaultValues: { name: '' },
	})

	const onSubmit = (data: TourManagerCreateFormData) => {
		mutation.mutate(trimData(data))
	}

	return (
		<Container>
			<EditWrapper>
				<Controller
					name='name'
					control={control}
					render={({ field: { value, onChange } }) => (
						<Input
							placeholder={t('tourManagers.input_name_placeholder')}
							value={value}
							onChange={onChange}
							errorMessage={errors.name?.message}
						/>
					)}
				/>
			</EditWrapper>
			<DeleteIcon onClick={() => handleCreateMode(false)} />
			{isDirty && !isSubmitting && (
				<SaveIcon
					data-cy='tour-manager-submit-create'
					onClick={handleSubmit(onSubmit)}
				/>
			)}
		</Container>
	)
}
