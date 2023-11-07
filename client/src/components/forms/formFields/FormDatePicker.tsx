import { FieldValues, useController } from 'react-hook-form'

import { DatePicker } from '@/components/ui/datePicker/DatePicker'
import { FormDatePickerProps } from './types'

export function FormDatePicker<T extends FieldValues>({
	name,
	control,
}: FormDatePickerProps<T>) {
	const {
		field: { onChange, value },
		fieldState: { error },
	} = useController({
		name,
		control,
	})
	return (
		<DatePicker value={value} onChange={onChange} errorMessage={error?.message} />
	)
}
