import { getErrorMessage, shouldDisplaySuccessMessage } from './utils'

import axios from 'axios'
import { toast } from 'react-toastify'

const client = axios.create({
	baseURL: 'http://localhost:8000/api/',
	headers: {
		Accept: 'application/json',
	},
})

client.interceptors.response.use(
	(res) => {
		if (shouldDisplaySuccessMessage(res)) {
			toast(res.data.message, {
				position: 'top-right',
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				theme: 'light',
				type: 'success',
			})
		}
		return res
	},
	(error) => {
		if (axios.isAxiosError(error)) {
			const errorMessage = getErrorMessage(error)
			toast(errorMessage, {
				position: 'top-right',
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				theme: 'light',
				type: 'error',
			})
		}

		return Promise.reject(error)
	}
)

export default client
