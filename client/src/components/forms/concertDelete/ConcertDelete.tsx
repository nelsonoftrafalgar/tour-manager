import { Button } from '@/components/ui/button/Button'
import { ConcertDeleteProps } from './types'
import { DeleteButtonsWrapper } from './styles'
import { FC } from 'react'
import { useConcertDeleteMutation } from '@/api/mutations/useConcertDeleteMutation'
import { useI18n } from '@/locales/client'

export const ConcertDelete: FC<ConcertDeleteProps> = ({
	handleModalClose,
	id,
}) => {
	const t = useI18n()
	const mutation = useConcertDeleteMutation(handleModalClose)

	const handleDeleteBand = () => {
		mutation.mutate({ id })
	}

	return (
		<>
			<p>{t('forms.confirm_delete_concert')}</p>
			<DeleteButtonsWrapper>
				<Button onClick={handleModalClose} buttonStyle='primary'>
					{t('forms.cancel')}
				</Button>
				<Button onClick={handleDeleteBand} buttonStyle='warning'>
					{t('forms.delete')}
				</Button>
			</DeleteButtonsWrapper>
		</>
	)
}
