export interface SelectProps {
	placeholder: string
	value: string
	onChange: (value: string) => void
	options: SelectOption[]
}

interface SelectOption {
	label: string
	value: string
}

export interface SelectOptionProps {
	children: string
	value: string
}
