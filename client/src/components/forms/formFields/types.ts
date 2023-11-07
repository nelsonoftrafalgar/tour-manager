import { Control, FieldValues, Path } from 'react-hook-form'

import { SelectOption } from '@/components/ui/select/types'

export interface FormInputProps<T extends FieldValues> {
	name: Path<T>
	placeholder: string
	label?: string
	control: Control<T>
}

export interface FormAmountProps<T extends FieldValues> {
	name: Path<T>
	label: string
	control: Control<T>
}

export interface FormDatePickerProps<T extends FieldValues> {
	name: Path<T>
	control: Control<T>
}

export interface FormRangePickerProps<T extends FieldValues> {
	name: Path<T>
	control: Control<T>
}

export interface FormSelectProps<T extends FieldValues> {
	name: Path<T>
	placeholder: string
	label: string
	control: Control<T>
	options: SelectOption[]
}

export interface FormTextareaProps<T extends FieldValues> {
	name: Path<T>
	placeholder: string
	label: string
	control: Control<T>
}
