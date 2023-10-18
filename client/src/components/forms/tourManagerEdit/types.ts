import { Dispatch, SetStateAction } from 'react'

export interface TourManagerEditProps {
	id: string
	name: string
	setIsEditMode: Dispatch<SetStateAction<boolean>>
}

export interface TourManagerEditFormData {
	name: string
}
