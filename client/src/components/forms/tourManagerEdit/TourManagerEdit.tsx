import { EditWrapper, SaveIcon } from './styles'
import React, { FC } from 'react'
import { TourManagerEditFormData, TourManagerEditProps } from './types'

import { FormInput } from '../formFields/FormInput'
import { getTourManagerSchema } from '../validation'
import { trimData } from '../utils'
import { useForm } from 'react-hook-form'
import { useI18n } from '@/locales/client'
import { useTourManagerEditMutation } from '@/api/mutations/useTourManagerEditMutation'
import { yupResolver } from '@hookform/resolvers/yup'

export const TourManagerEdit: FC<TourManagerEditProps> = ({
	name,
	id,
	setIsEditMode,
}) => {
	const t = useI18n()
	const {
		control,
		formState: { isDirty, isSubmitting },
		handleSubmit,
	} = useForm<TourManagerEditFormData>({
		resolver: yupResolver(getTourManagerSchema(t)),
		defaultValues: { name },
	})

	const editMutation = useTourManagerEditMutation(() => {
		setIsEditMode(false)
	})

	const handleEditTourManager = ({ name }: TourManagerEditFormData) => {
		editMutation.mutate(trimData({ id, name }))
	}

	return (
		<>
			<EditWrapper>
				<FormInput
					placeholder={t('tourManagers.input_name_placeholder')}
					name='name'
					control={control}
				/>
			</EditWrapper>
			{isDirty && !isSubmitting && (
				<SaveIcon
					data-cy='tour-manager-save-edit-icon'
					onClick={handleSubmit(handleEditTourManager)}
				/>
			)}
		</>
	)
}
