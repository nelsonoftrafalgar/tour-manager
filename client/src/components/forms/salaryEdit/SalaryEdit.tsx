import { SalaryEditFormData, SalaryEditProps } from './types'

import { Button } from '@/components/ui/button/Button'
import { CommentWrapper } from './styles'
import { FC } from 'react'
import { Form } from '@/components/ui/form/styles'
import { FormAmount } from '../formFields/FormAmount'
import { FormSelect } from '../formFields/FormSelect'
import { FormTextarea } from '../formFields/FormTextarea'
import { LoaderIcon } from '@/components/ui/loader/styles'
import { getSalarySchema } from '../validation'
import { trimData } from '../utils'
import { useConcertsQuery } from '@/api/queries/useConcertsQuery'
import { useForm } from 'react-hook-form'
import { useI18n } from '@/locales/client'
import { useSalaryEditMutation } from '@/api/mutations/useSalaryEditMutation'
import { yupResolver } from '@hookform/resolvers/yup'

export const SalaryEdit: FC<SalaryEditProps> = ({
	id,
	amount,
	comment,
	concertId,
	handleModalClose,
}) => {
	const t = useI18n()
	const { data: concerts } = useConcertsQuery()
	const {
		formState: { isSubmitting },
		control,
		handleSubmit,
	} = useForm<SalaryEditFormData>({
		resolver: yupResolver(getSalarySchema(t)),
		defaultValues: { amount, comment, concertId },
	})
	const mutation = useSalaryEditMutation(handleModalClose)

	if (!concerts) return null

	const onSubmit = (data: SalaryEditFormData) => {
		const { amount, comment, concertId } = data

		mutation.mutate(
			trimData({
				id,
				amount,
				comment,
				concertId,
			})
		)
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<FormSelect
				name='concertId'
				control={control}
				placeholder={t('salaries.select_concert_palceholder')}
				label={t('salaries.select_concert_label')}
				options={concerts.map(({ place, id }) => ({ label: place, value: id }))}
			/>
			<FormAmount
				name='amount'
				control={control}
				label={t('salaries.amount_label')}
			/>

			<CommentWrapper>
				<FormTextarea
					label={t('salaries.comment_label')}
					placeholder={t('salaries.comment_placeholder')}
					name='comment'
					control={control}
				/>
				<Button
					data-cy='salary-edit-submit'
					disabled={isSubmitting}
					buttonStyle='secondary'
				>
					{isSubmitting && <LoaderIcon />}
					{t('forms.edit')}
				</Button>
			</CommentWrapper>
		</Form>
	)
}
