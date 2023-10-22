'use client'

import {
	CopyIcon,
	ExclamationTriangleIcon,
	Pencil2Icon,
} from '@radix-ui/react-icons'

import { Amount } from '@/components/ui/amount/Amount'
import { Button } from '@/components/ui/button/Button'
import { RangePicker } from '@/components/ui/datePicker/RangePicker'
import { Textarea } from '@/components/ui/textarea/Textarea'
import styled from 'styled-components'
import { useState } from 'react'

const Separator = styled.div`
	width: 100%;
	height: 30px;
`

export default function Styleguide() {
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
		</div>
	)
}
