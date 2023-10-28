import { Controller, useForm } from 'react-hook-form'
import { SalaryEditFormData, SalaryEditProps } from './types'

import { Amount } from '@/components/ui/amount/Amount'
import { Button } from '@/components/ui/button/Button'
import { CommentWrapper } from './styles'
import { FC } from 'react'
import { Form } from '@/components/ui/form/styles'
import { LoaderIcon } from '@/components/ui/loader/styles'
import { Select } from '@/components/ui/select/Select'
import { Textarea } from '@/components/ui/textarea/Textarea'
import { getSalarySchema } from '../validation'
import { useConcertsQuery } from '@/api/queries/useConcertsQuery'
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
		formState: { errors, isSubmitting },
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

		mutation.mutate({
			id,
			amount,
			comment,
			concertId,
		})
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<Controller
				name='concertId'
				control={control}
				render={({ field }) => (
					<Select
						{...field}
						placeholder={t('salaries.select_concert_palceholder')}
						label={t('salaries.select_concert_label')}
						options={concerts.map(({ place, id }) => ({ label: place, value: id }))}
						errorMessage={errors.concertId?.message}
					/>
				)}
			/>
			<Controller
				name='amount'
				control={control}
				render={({ field }) => (
					<Amount
						{...field}
						label={t('salaries.amount_label')}
						errorMessage={errors.amount?.message}
					/>
				)}
			/>

			<CommentWrapper>
				<Controller
					name='comment'
					control={control}
					render={({ field }) => (
						<Textarea
							label={t('salaries.comment_label')}
							placeholder={t('salaries.comment_placeholder')}
							{...field}
							errorMessage={errors.comment?.message}
						/>
					)}
				/>
				<Button disabled={isSubmitting} buttonStyle='secondary'>
					{isSubmitting && <LoaderIcon />}
					{t('forms.edit')}
				</Button>
			</CommentWrapper>
		</Form>
	)
}
