import { Button } from '@/components/ui/button/Button'
import { CommentWrapper } from './styles'
import { ConcertDetails } from './ConcertDetails'
import { Form } from '@/components/ui/form/styles'
import { FormAmount } from '../formFields/FormAmount'
import { FormSelect } from '../formFields/FormSelect'
import { FormTextarea } from '../formFields/FormTextarea'
import { LoaderIcon } from '@/components/ui/loader/styles'
import { SalaryCreateFormData } from './types'
import { getSalarySchema } from '../validation'
import { trimData } from '../utils'
import { useConcertsQuery } from '@/api/queries/useConcertsQuery'
import { useForm } from 'react-hook-form'
import { useI18n } from '@/locales/client'
import { useSalaryCreateMutation } from '@/api/mutations/useSalaryCreateMutation'
import { yupResolver } from '@hookform/resolvers/yup'

export const SalaryCreate = () => {
	const t = useI18n()
	const { data: concerts } = useConcertsQuery()
	const {
		formState: { isSubmitting },
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
			<FormSelect
				name='concertId'
				control={control}
				placeholder={t('salaries.select_concert_palceholder')}
				label={t('salaries.select_concert_label')}
				options={concerts.map(({ place, id }) => ({ label: place, value: id }))}
				key={selectedConcertId}
			/>
			<FormAmount
				name='amount'
				control={control}
				label={t('salaries.amount_label')}
			/>
			{selectedConcertId && <ConcertDetails concertId={selectedConcertId} />}
			<CommentWrapper>
				<FormTextarea
					label={t('salaries.comment_label')}
					placeholder={t('salaries.comment_placeholder')}
					name='comment'
					control={control}
				/>
				<Button disabled={isSubmitting} buttonStyle='primary'>
					{isSubmitting && <LoaderIcon />}
					{t('forms.create')}
				</Button>
			</CommentWrapper>
		</Form>
	)
}
