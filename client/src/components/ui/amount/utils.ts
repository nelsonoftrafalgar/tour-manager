const CURRENCY = '$'

export const formatValue = (value: string) =>
	value.length === 0 ? value : `${CURRENCY}${value}`
