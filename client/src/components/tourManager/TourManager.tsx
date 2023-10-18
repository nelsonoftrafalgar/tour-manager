import { CancelIcon, Container, DeleteIcon, EditIcon, Name } from './styles'
import { FC, useState } from 'react'

import { Tooltip } from '@/components/ui/tooltip/Tooltip'
import { TourManagerEdit } from '../forms/tourManagerEdit/TourManagerEdit'
import { TourManagerProps } from './types'
import { useTourManagerDeleteMutation } from '@/api/mutations/useTourManagerDeleteMutation'

export const TourManager: FC<TourManagerProps> = ({ name, id }) => {
	const [isEditMode, setIsEditMode] = useState(false)
	const deleteMutation = useTourManagerDeleteMutation()

	const handleDeleteTourManager = () => {
		deleteMutation.mutate(id)
	}

	const handleCancelEdit = () => {
		setIsEditMode(false)
	}

	const handleEnableEdit = () => {
		setIsEditMode(true)
	}

	return (
		<Container>
			{isEditMode ? (
				<TourManagerEdit name={name} id={id} setIsEditMode={setIsEditMode} />
			) : (
				<Tooltip title={name}>
					<Name>{name}</Name>
				</Tooltip>
			)}
			<DeleteIcon onClick={handleDeleteTourManager} />
			{!isEditMode && <EditIcon onClick={handleEnableEdit} />}
			{isEditMode && <CancelIcon onClick={handleCancelEdit} />}
		</Container>
	)
}
