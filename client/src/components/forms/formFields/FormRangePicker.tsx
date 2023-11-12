import { FieldValues, useController } from 'react-hook-form'

import { FormRangePickerProps } from './types'
import { RangePicker } from '@/components/ui/datePicker/RangePicker'

export function FormRangePicker<T extends FieldValues>({
	name,
	control,
}: FormRangePickerProps<T>) {
	const {
		field: { onChange, value },
		fieldState: { error },
	} = useController({
		name,
		control,
	})
	return (
		<RangePicker
			value={value}
			onChange={onChange}
			errorMessage={error?.message}
		/>
	)
}
