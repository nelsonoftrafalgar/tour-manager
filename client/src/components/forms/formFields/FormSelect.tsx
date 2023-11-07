import { FieldValues, useController } from 'react-hook-form'

import { FormSelectProps } from './types'
import { Select } from '@/components/ui/select/Select'

export function FormSelect<T extends FieldValues>({
	name,
	placeholder,
	label,
	control,
	options,
}: FormSelectProps<T>) {
	const {
		field: { onChange, value },
		fieldState: { error },
	} = useController({
		name,
		control,
	})
	return (
		<Select
			placeholder={placeholder}
			label={label}
			value={value}
			onChange={onChange}
			errorMessage={error?.message}
			options={options}
		/>
	)
}
