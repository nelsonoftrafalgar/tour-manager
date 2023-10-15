import { AxiosError, AxiosResponse } from 'axios'

export const shouldDisplaySuccessMessage = (res: AxiosResponse) => {
	return ['delete', 'put', 'post'].includes(res.config.method ?? '')
}

export const getErrorMessage = ({
	response,
}: AxiosError<{ message: string; error: string }>) => {
	console.log('response: ', response)
	const delete404 =
		response?.config.method === 'delete' && response.status === 404
	const delete400 =
		response?.config.method === 'delete' && response.status === 400
	const post400 = response?.config.method === 'post' && response.status === 400
	const post409 = response?.config.method === 'post' && response.status === 409
	const put400 = response?.config.method === 'put' && response.status === 400
	const put409 = response?.config.method === 'put' && response.status === 409

	if (delete404 || post409 || put409) {
		return response?.data.message
	}

	if (post400 || put400 || delete400) {
		return response?.data.error
	}
}
