import api from './api' //individualcalls for each api, imports urls from .env

 const authApi = {
   post: (url, data, config) => api.post(import.meta.env.VITE_AUTH_API_URL + url, data, config)
};

export default authApi;