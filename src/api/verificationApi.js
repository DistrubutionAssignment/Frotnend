import api from './api' //individualcalls for each api, imports urls from .env

const verificationApi = {
  post: (url, data, config) =>
    api.post(import.meta.env.VITE_VERIFICATION_API_URL + url, data, config)
}

export default verificationApi
