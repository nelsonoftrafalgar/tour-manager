import { Controller, useForm } from 'react-hook-form'

import { Amount } from '@/components/ui/amount/Amount'
import { Button } from '@/components/ui/button/Button'
import { CommentWrapper } from './styles'
import { DatePicker } from '@/components/ui/datePicker/DatePicker'
import { Form } from '@/components/ui/form/styles'
import { LoaderIcon } from '@/components/ui/loader/styles'
import { SalaryCreateFormData } from './types'
import { Select } from '@/components/ui/select/Select'
import { Textarea } from '@/components/ui/textarea/Textarea'
import { getSalarySchema } from '../validation'
import { useBandsQuery } from '@/api/queries/useBandsQuery'
import { useConcertsQuery } from '@/api/queries/useConcertsQuery'
import { useI18n } from '@/locales/client'
import { yupResolver } from '@hookform/resolvers/yup'

export const SalaryCreate = () => {
	const t = useI18n()
	const { data: concerts } = useConcertsQuery()
	const { data: bands } = useBandsQuery()
	const {
		formState: { errors, isSubmitting },
		control,
		handleSubmit,
	} = useForm<SalaryCreateFormData>({
		resolver: yupResolver(getSalarySchema(t)),
		defaultValues: { amount: '', comment: '' },
	})

	const onSubmit = (data: SalaryCreateFormData) => {
		console.log({ data })
	}

	if (!concerts || !bands) return null

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<Controller
				name='place'
				control={control}
				render={({ field }) => (
					<Select
						{...field}
						placeholder={t('salaries.select_concert_palceholder')}
						label={t('salaries.select_concert_label')}
						options={concerts.map(({ place, id }) => ({ label: place, value: id }))}
						errorMessage={errors.place?.message}
					/>
				)}
			/>
			<Controller
				name='bandId'
				control={control}
				render={({ field }) => (
					<Select
						{...field}
						placeholder={t('salaries.select_band_placeholder')}
						label={t('salaries.select_band_label')}
						options={bands.map(({ name, id }) => ({ label: name, value: id }))}
						errorMessage={errors.bandId?.message}
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
			<Controller
				name='date'
				control={control}
				render={({ field }) => (
					<DatePicker {...field} errorMessage={errors.date?.message} />
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
				<Button disabled={isSubmitting} buttonStyle='primary'>
					{isSubmitting && <LoaderIcon />}
					{t('forms.create')}
				</Button>
			</CommentWrapper>
		</Form>
	)
}
