import * as yup from 'yup'

import { useI18n } from '@/locales/client'

type Translate = ReturnType<typeof useI18n>

export const getConcertSchema = (t: Translate) =>
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

export const getBandSchema = (t: Translate) =>
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

export const getTourManagerSchema = (t: Translate) =>
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
export const getSalarySchema = (t: Translate) =>
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

export const getReportSchema = (t: Translate) =>
	yup
		.object({
			date: yup.string().required(t('forms.range_required')),
		})
		.required()
