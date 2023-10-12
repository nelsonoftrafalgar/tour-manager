import { BandDeleteProps } from './types'
import { Button } from '@/components/ui/button/Button'
import { DeleteButtonsWrapper } from './styles'
import { FC } from 'react'
import { useI18n } from '@/locales/client'

export const BandDelete: FC<BandDeleteProps> = ({
	handleModalClose,
	id,
	name,
}) => {
	const t = useI18n()

	const handleDeleteBand = () => {
		console.log('delete: ', id)
		handleModalClose()
	}

	return (
		<>
			<p>
				{t('forms.confirm_delete')} {name}
			</p>
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
