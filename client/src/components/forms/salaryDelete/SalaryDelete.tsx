import { Button } from '@/components/ui/button/Button'
import { DeleteButtonsWrapper } from './styles'
import { FC } from 'react'
import { SalaryDeleteProps } from './types'
import { useI18n } from '@/locales/client'
import { useSalaryDeleteMutation } from '@/api/mutations/useSalaryDeleteMutation'

export const SalaryDelete: FC<SalaryDeleteProps> = ({
	handleModalClose,
	id,
	place,
}) => {
	const t = useI18n()
	const mutation = useSalaryDeleteMutation(handleModalClose)

	const handleDeleteBand = () => {
		mutation.mutate({ id })
	}

	return (
		<>
			<p>
				{t('forms.confirm_delete')} {place}
			</p>
			<DeleteButtonsWrapper>
				<Button onClick={handleModalClose} buttonStyle='primary'>
					{t('forms.cancel')}
				</Button>
				<Button
					onClick={handleDeleteBand}
					buttonStyle='warning'
					data-cy='salary-delete-submit'
				>
					{t('forms.delete')}
				</Button>
			</DeleteButtonsWrapper>
		</>
	)
}
