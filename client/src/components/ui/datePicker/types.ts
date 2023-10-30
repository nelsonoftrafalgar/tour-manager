export interface DatePickerProps {
	errorMessage?: string
	onChange: (date?: string) => void
	value: string
}

export interface RangePickerProps {
	onChange: (date?: string) => void
	value: string
}
