import { Controller, useForm } from 'react-hook-form'
import { EditWrapper, SaveIcon } from './styles'
import React, { FC } from 'react'
import { TourManagerEditFormState, TourManagerEditProps } from './types'

import { Input } from '@/components/ui/input/Input'
import { getTourManagerSchema } from '../validation'
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
		formState: { errors, isDirty, isSubmitting },
		handleSubmit,
	} = useForm<TourManagerEditFormState>({
		resolver: yupResolver(getTourManagerSchema(t)),
		defaultValues: { name },
	})

	const editMutation = useTourManagerEditMutation(() => {
		setIsEditMode(false)
	})

	const handleEditTourManager = ({ name }: TourManagerEditFormState) => {
		editMutation.mutate({ id, name: name.trim() })
	}

	return (
		<>
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
			{isDirty && !isSubmitting && (
				<SaveIcon onClick={handleSubmit(handleEditTourManager)} />
			)}
		</>
	)
}
