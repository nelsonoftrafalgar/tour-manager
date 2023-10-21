export interface SelectProps {
	placeholder: string
	value: string
	onChange: (value: string) => void
	options: SelectOption[]
	label?: string
}

interface SelectOption {
	label: string
	value: string
}

export interface SelectOptionProps {
	children: string
	value: string
}
