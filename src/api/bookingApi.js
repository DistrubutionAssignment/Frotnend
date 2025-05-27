import api from './api';


 const bookingApi = {
   get:    (url, config) => api.get(import.meta.env.VITE_BOOKING_API_URL + url, config),
   post:   (url, data, config) => api.post(import.meta.env.VITE_BOOKING_API_URL + url, data, config),
   put:    (url, data, config) => api.put(import.meta.env.VITE_BOOKING_API_URL + url, data, config),
   delete: (url, config) => api.delete(import.meta.env.VITE_BOOKING_API_URL + url, config),
};

export default bookingApi;
