import axios from 'axios';

const bookingApi = axios.create({
  baseURL: import.meta.env.VITE_BOOKING_API_URL,
});

export default bookingApi;
