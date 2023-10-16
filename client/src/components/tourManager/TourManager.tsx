import {
	Container,
	DeleteIcon,
	EditIcon,
	EditWrapper,
	Name,
	SaveIcon,
} from './styles'
import { FC, useState } from 'react'

import { Input } from '@/components/ui/input/Input'
import { Tooltip } from '@/components/ui/tooltip/Tooltip'
import { TourManagerProps } from './types'

export const TourManager: FC<TourManagerProps> = ({ name }) => {
	const [isEditMode, setIsEditMode] = useState(false)
	return (
		<Container>
			{isEditMode ? (
				<EditWrapper>
					<Input value={name} onChange={() => {}} />
				</EditWrapper>
			) : (
				<Tooltip title={name}>
					<Name>{name}</Name>
				</Tooltip>
			)}
			<DeleteIcon />
			{isEditMode ? (
				<SaveIcon onClick={() => setIsEditMode(false)} />
			) : (
				<EditIcon onClick={() => setIsEditMode(true)} />
			)}
		</Container>
	)
}

export default TourManager
