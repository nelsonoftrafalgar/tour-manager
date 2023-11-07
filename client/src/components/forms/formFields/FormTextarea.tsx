import { FieldValues, useController } from 'react-hook-form'

import { FormTextareaProps } from './types'
import { Textarea } from '@/components/ui/textarea/Textarea'

export function FormTextarea<T extends FieldValues>({
	name,
	placeholder,
	label,
	control,
}: FormTextareaProps<T>) {
	const {
		field: { onChange, value },
		fieldState: { error },
	} = useController({
		name,
		control,
	})
	return (
		<Textarea
			placeholder={placeholder}
			label={label}
			value={value}
			onChange={onChange}
			errorMessage={error?.message}
		/>
	)
}
