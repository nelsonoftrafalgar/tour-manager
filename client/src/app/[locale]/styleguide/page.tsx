'use client'

import {
	CopyIcon,
	ExclamationTriangleIcon,
	Pencil2Icon,
} from '@radix-ui/react-icons'
import {
	useChangeLocale,
	useCurrentLocale,
	useI18n,
	useScopedI18n,
} from '@/locales/client'

import { Amount } from '@/components/ui/amount/Amount'
import { Button } from '@/components/ui/button/Button'
import { Input } from '@/components/ui/input/Input'
import { Select } from '@/components/ui/select/Select'
import { Textarea } from '@/components/ui/textarea/Textarea'
import styled from 'styled-components'
import { useState } from 'react'

const Separator = styled.div`
	width: 100%;
	height: 30px;
`

export default function Styleguide() {
	const t = useI18n()
	const changeLocale = useChangeLocale()
	const t2 = useScopedI18n('scope.more')
	const locale = useCurrentLocale()

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

			<p>
				Current locale:
				<span>{locale}</span>
			</p>
			<p>Hello: {t('hello')}</p>
			<p>
				Hello:{' '}
				{t('welcome', {
					name: 'John',
				})}
			</p>
			<p>
				Hello (with React components):{' '}
				{t('welcome', {
					name: <strong>John</strong>,
				})}
			</p>
			<p>
				Hello:{' '}
				{t('about.you', {
					age: '23',
					name: 'Doe',
				})}
			</p>
			<p>
				Hello (with React components):{' '}
				{t('about.you', {
					age: <strong>23</strong>,
					name: 'Doe',
				})}
			</p>
			<p>{t2('test')}</p>
			<p>
				{t2('param', {
					param: 'test',
				})}
			</p>
			<p>
				{t2('param', {
					param: <strong>test</strong>,
				})}
			</p>
			<p>{t2('and.more.test')}</p>
			<p>{t('missing.translation.in.fr')}</p>
			<p>
				{t('cows', {
					count: 1,
				})}
			</p>
			<p>
				{t('cows', {
					count: 2,
				})}
			</p>
			<p>
				{t2('stars', {
					count: 1,
				})}
			</p>
			<p>
				{t2('stars', {
					count: 2,
				})}
			</p>
			<button type='button' onClick={() => changeLocale('en')}>
				EN
			</button>
		</div>
	)
}
