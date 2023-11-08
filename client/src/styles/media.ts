import { css } from 'styled-components'
import { Styles } from 'styled-components/dist/types'

const device = {
	sm: '576px',
	md: '768px',
	lg: '992px',
	xl: '1200px',
	xxl: '1400px',
}

export const media = {
	sm: (args: Styles<object>) => css`
		@media (min-width: ${device.sm}) {
			${css(args)};
		}
	`,
	md: (args: Styles<object>) => css`
		@media (min-width: ${device.md}) {
			${css(args)};
		}
	`,
	lg: (args: Styles<object>) => css`
		@media (min-width: ${device.lg}) {
			${css(args)};
		}
	`,
	xl: (args: Styles<object>) => css`
		@media (min-width: ${device.xl}) {
			${css(args)};
		}
	`,
	xxl: (args: Styles<object>) => css`
		@media (min-width: ${device.xxl}) {
			${css(args)};
		}
	`,
}
