import { Container, DeleteIcon, EditWrapper, SaveIcon } from './styles'
import { TourManagerCreateFormData, TourManagerCreateProps } from './types'

import { FC } from 'react'
import { FormInput } from '../formFields/FormInput'
import { getTourManagerSchema } from '../validation'
import { trimData } from '../utils'
import { useForm } from 'react-hook-form'
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
		formState: { isDirty, isSubmitting },
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
				<FormInput
					placeholder={t('tourManagers.input_name_placeholder')}
					name='name'
					control={control}
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
