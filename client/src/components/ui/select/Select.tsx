'use client'

import * as Component from '@radix-ui/react-select'

import { FC, Ref, forwardRef, useState } from 'react'
import {
	SelectContent,
	SelectIcon,
	SelectItem,
	SelectTrigger,
	StyledLabel,
} from './styles'
import { SelectOptionProps, SelectProps } from './types'

import { CheckIcon } from '@radix-ui/react-icons'

export const Select: FC<SelectProps> = ({
	placeholder,
	value,
	onChange,
	options,
	label,
}) => {
	const [open, setOpen] = useState(false)

	return (
		<div>
			{label && <StyledLabel htmlFor={label}>{label}</StyledLabel>}
			<Component.Root
				value={value}
				onValueChange={onChange}
				onOpenChange={setOpen}
			>
				<SelectTrigger $open={open}>
					<Component.Value placeholder={placeholder} />
					<Component.Icon>
						<SelectIcon />
					</Component.Icon>
				</SelectTrigger>
				<SelectContent collisionPadding={0} position='popper'>
					<Component.Viewport>
						{options.map(({ value, label }) => (
							<SelectOption key={value} value={value}>
								{label}
							</SelectOption>
						))}
					</Component.Viewport>
				</SelectContent>
			</Component.Root>
		</div>
	)
}

const SelectOption = forwardRef(
	(
		{ children, ...props }: SelectOptionProps,
		ref: Ref<HTMLDivElement> | undefined
	) => {
		return (
			<SelectItem {...props} ref={ref}>
				<Component.ItemText>{children}</Component.ItemText>
				<Component.ItemIndicator>
					<CheckIcon />
				</Component.ItemIndicator>
			</SelectItem>
		)
	}
)

SelectOption.displayName = 'SelectOption'
