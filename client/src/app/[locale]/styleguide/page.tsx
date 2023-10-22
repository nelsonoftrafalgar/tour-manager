'use client'

import {
	CopyIcon,
	ExclamationTriangleIcon,
	Pencil2Icon,
} from '@radix-ui/react-icons'

import { Amount } from '@/components/ui/amount/Amount'
import { Button } from '@/components/ui/button/Button'
import { DatePicker } from '@/components/ui/datePicker/DatePicker'
import { Input } from '@/components/ui/input/Input'
import { RangePicker } from '@/components/ui/datePicker/RangePicker'
import { Select } from '@/components/ui/select/Select'
import { Textarea } from '@/components/ui/textarea/Textarea'
import styled from 'styled-components'
import { useState } from 'react'

const Separator = styled.div`
	width: 100%;
	height: 30px;
`

export default function Styleguide() {
	const [selectValue, setSelectValue] = useState('pizza')
	const [amount, setAmount] = useState('100')

	return (
		<div>
			<Separator />
			<Button buttonStyle='primary'>
				<Pencil2Icon />
				button
			</Button>
			<Separator />
			<Button buttonStyle='secondary'>
				button
				<CopyIcon />
			</Button>
			<Separator />
			<Button buttonStyle='warning'>
				<ExclamationTriangleIcon />
				button
			</Button>
			<Separator />
			<Button disabled buttonStyle='warning'>
				button
			</Button>
			<Separator />

			<Amount
				value={amount}
				onChange={(value) => setAmount(value)}
				label='Amount'
			/>
			<Separator />

			<Select
				value={selectValue}
				onChange={(value) => setSelectValue(value)}
				placeholder='Some placeholder'
				options={[
					{ label: 'Pizza', value: 'pizza' },
					{ label: 'Burger', value: 'burger' },
					{ label: 'Pasta', value: 'pasta' },
					{ label: 'Steak', value: 'steak' },
				]}
			/>
			<Separator />

			<Input
				onChange={() => console.log()}
				value=''
				label='Some label'
				placeholder='Some placeholder'
			/>
			<Separator />

			<Input
				onChange={() => console.log()}
				value='Hello'
				label='Some label'
				placeholder='Some placeholder'
				errorMessage='There is an error'
			/>
			<Separator />

			<Textarea
				onChange={() => console.log()}
				value=''
				label='Textarea label'
				placeholder='Some placeholder'
			/>
			<Separator />

			<Textarea
				onChange={() => console.log()}
				value='hello'
				label='Textarea label'
				placeholder='Some placeholder'
				errorMessage='There is an error'
			/>
			<Separator />

			<RangePicker />
			<Separator />

			<DatePicker value='' onChange={() => null} />
			<Separator />
		</div>
	)
}
