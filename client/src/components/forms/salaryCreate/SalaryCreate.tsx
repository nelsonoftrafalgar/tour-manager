import { Controller, useForm } from 'react-hook-form'

import { Amount } from '@/components/ui/amount/Amount'
import { Button } from '@/components/ui/button/Button'
import { CommentWrapper } from './styles'
import { ConcertDetails } from './ConcertDetails'
import { Form } from '@/components/ui/form/styles'
import { LoaderIcon } from '@/components/ui/loader/styles'
import { SalaryCreateFormData } from './types'
import { Select } from '@/components/ui/select/Select'
import { Textarea } from '@/components/ui/textarea/Textarea'
import { getSalarySchema } from '../validation'
import { trimData } from '../utils'
import { useConcertsQuery } from '@/api/queries/useConcertsQuery'
import { useI18n } from '@/locales/client'
import { useSalaryCreateMutation } from '@/api/mutations/useSalaryCreateMutation'
import { yupResolver } from '@hookform/resolvers/yup'

export const SalaryCreate = () => {
	const t = useI18n()
	const { data: concerts } = useConcertsQuery()
	const {
		formState: { errors, isSubmitting },
		control,
		handleSubmit,
		watch,
		reset,
	} = useForm<SalaryCreateFormData>({
		resolver: yupResolver(getSalarySchema(t)),
		defaultValues: { amount: '', comment: '', concertId: '' },
	})
	const mutation = useSalaryCreateMutation(() => reset({}))

	if (!concerts) return null

	const selectedConcertId = watch('concertId')

	const onSubmit = (data: SalaryCreateFormData) => {
		const { amount, comment, concertId } = data

		mutation.mutate(
			trimData({
				amount,
				comment,
				concertId,
			})
		)
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<Controller
				name='concertId'
				control={control}
				render={({ field: { value, onChange } }) => (
					<Select
						value={value}
						onChange={onChange}
						placeholder={t('salaries.select_concert_palceholder')}
						label={t('salaries.select_concert_label')}
						options={concerts.map(({ place, id }) => ({ label: place, value: id }))}
						errorMessage={errors.concertId?.message}
						key={selectedConcertId}
					/>
				)}
			/>
			<Controller
				name='amount'
				control={control}
				render={({ field: { value, onChange } }) => (
					<Amount
						value={value}
						onChange={onChange}
						label={t('salaries.amount_label')}
						errorMessage={errors.amount?.message}
					/>
				)}
			/>

			{selectedConcertId && <ConcertDetails concertId={selectedConcertId} />}
			<CommentWrapper>
				<Controller
					name='comment'
					control={control}
					render={({ field: { value, onChange } }) => (
						<Textarea
							label={t('salaries.comment_label')}
							placeholder={t('salaries.comment_placeholder')}
							value={value}
							onChange={onChange}
							errorMessage={errors.comment?.message}
						/>
					)}
				/>
				<Button disabled={isSubmitting} buttonStyle='primary'>
					{isSubmitting && <LoaderIcon />}
					{t('forms.create')}
				</Button>
			</CommentWrapper>
		</Form>
	)
}
