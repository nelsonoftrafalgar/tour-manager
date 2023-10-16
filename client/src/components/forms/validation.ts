import * as yup from 'yup'

import { useI18n } from '@/locales/client'

export const getBandSchema = (t: ReturnType<typeof useI18n>) =>
	yup
		.object({
			name: yup
				.string()
				.matches(/^[A-Za-z\s]+$/, {
					excludeEmptyString: true,
					message: t('forms.invalid_characters'),
				})
				.required(t('forms.required')),
			frontMan: yup
				.string()
				.matches(/^[A-Za-z\s]+$/, {
					excludeEmptyString: true,
					message: t('forms.invalid_characters'),
				})
				.required(t('forms.required')),
		})
		.required()
