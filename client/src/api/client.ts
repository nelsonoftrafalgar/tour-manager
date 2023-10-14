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
		if (res.config.method === 'delete') {
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
		if (res.config.method === 'put') {
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
		if (res.config.method === 'post') {
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
			if (error.response?.config.method === 'delete') {
				toast(error.response?.data.message, {
					position: 'top-right',
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					theme: 'light',
					type: 'error',
				})
			}
			if (
				error.response?.config.method === 'delete' &&
				error.response.status === 400
			) {
				toast(error.response?.data.error, {
					position: 'top-right',
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					theme: 'light',
					type: 'error',
				})
			}
			if (
				error.response?.config.method === 'post' &&
				error.response.status === 400
			) {
				toast(error.response?.data.error, {
					position: 'top-right',
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					theme: 'light',
					type: 'error',
				})
			}
			if (
				error.response?.config.method === 'put' &&
				error.response.status === 400
			) {
				toast(error.response?.data.error, {
					position: 'top-right',
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					theme: 'light',
					type: 'error',
				})
			}
			if (
				error.response?.config.method === 'post' &&
				error.response.status === 409
			) {
				toast(error.response?.data.message, {
					position: 'top-right',
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					theme: 'light',
					type: 'error',
				})
			}
			if (
				error.response?.config.method === 'put' &&
				error.response.status === 409
			) {
				toast(error.response?.data.message, {
					position: 'top-right',
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					theme: 'light',
					type: 'error',
				})
			}
		}

		return Promise.reject(error)
	}
)

export default client
