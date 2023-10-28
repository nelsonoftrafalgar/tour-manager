import * as yup from 'yup'

import { useI18n } from '@/locales/client'

export const getConcertSchema = (t: ReturnType<typeof useI18n>) =>
	yup
		.object({
			place: yup
				.string()
				.max(250)
				.matches(/^[A-Za-z\s]+$/, {
					excludeEmptyString: true,
					message: t('forms.invalid_characters'),
				})
				.required(t('forms.required')),
			bandId: yup.string().required(t('forms.required')),
			tourManagerId: yup.string().required(t('forms.required')),
			date: yup.string().required(t('forms.required')),
		})
		.required()

export const getBandSchema = (t: ReturnType<typeof useI18n>) =>
	yup
		.object({
			name: yup
				.string()
				.max(250)
				.matches(/^[A-Za-z\s]+$/, {
					excludeEmptyString: true,
					message: t('forms.invalid_characters'),
				})
				.required(t('forms.required')),
			frontMan: yup
				.string()
				.max(250)
				.matches(/^[A-Za-z\s]+$/, {
					excludeEmptyString: true,
					message: t('forms.invalid_characters'),
				})
				.required(t('forms.required')),
		})
		.required()

export const getTourManagerSchema = (t: ReturnType<typeof useI18n>) =>
	yup
		.object({
			name: yup
				.string()
				.max(250)
				.matches(/^[A-Za-z\s]+$/, {
					excludeEmptyString: true,
					message: t('forms.invalid_characters'),
				})
				.required(t('forms.required')),
		})
		.required()
export const getSalarySchema = (t: ReturnType<typeof useI18n>) =>
	yup
		.object({
			concertId: yup.string().required(t('forms.required')),
			amount: yup
				.string()
				.max(13)
				.matches(/^\$\d+(\.\d{1,2})?$/, {
					excludeEmptyString: true,
					message: t('forms.invalid_characters'),
				})
				.required(t('forms.required')),
			comment: yup
				.string()
				.defined()
				.strict(true)
				.max(250)
				.matches(/^[A-Za-z0-9\s]+$/, {
					excludeEmptyString: true,
					message: t('forms.invalid_characters'),
				}),
		})
		.required()
