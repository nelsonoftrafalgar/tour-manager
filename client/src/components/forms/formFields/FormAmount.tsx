import { FieldValues, useController } from 'react-hook-form'

import { Amount } from '@/components/ui/amount/Amount'
import { FormAmountProps } from './types'

export function FormAmount<T extends FieldValues>({
	name,
	label,
	control,
}: FormAmountProps<T>) {
	const {
		field: { onChange, value },
		fieldState: { error },
	} = useController({
		name,
		control,
	})
	return (
		<Amount
			label={label}
			value={value}
			onChange={onChange}
			errorMessage={error?.message}
		/>
	)
}
